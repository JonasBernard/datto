package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/JonasBernard/min-cost-max-flow/matching"
	"github.com/JonasBernard/min-cost-max-flow/util"
)

type MatchNode[L any, R any] struct {
	Name       string
	IsRight    bool
	IsSource   bool
	IsSink     bool
	LeftValue  L
	RightValue R
}

func (n MatchNode[L, R]) String() string {
	return n.Name
}

type Child struct {
	Name   string    `json:"name"`
	Wishes [3]string `json:"wishes"`
}

func (c Child) String() string {
	return c.Name
}

type WorkshopSlot struct {
	Workshop Workshop
	Nr       int
}

func (w WorkshopSlot) String() string {
	return fmt.Sprintf("%v (slot %v)", w.Workshop.Name, w.Nr)
}

type Workshop struct {
	Name     string `json:"name"`
	Capacity int    `json:"capacity,string"`
}

type SentWishes struct {
	Kids      []Child
	Workshops []Workshop
}

type ResponseSolution struct {
	Solution []matching.MatchingEdge[Child, WorkshopSlot] `json:"solution"`
	Status   string                                       `json:"status"`
}

func AllowOriginLocalhsot(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000, https://gruppen-tool.jonasbernard.de")
}

func AddDefaultHeader(w *http.ResponseWriter) {
	headers := (*w).Header()
	headers.Add("Vary", "Origin")
	headers.Add("Vary", "Access-Control-Request-Method")
	headers.Add("Vary", "Access-Control-Request-Headers")
	headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token")
	headers.Add("Access-Control-Allow-Methods", "POST, OPTIONS")
}

func GetEdgeWeight(wishIndex int) float64 {
	return float64(wishIndex * wishIndex)
}

func NormalizeString(s string) string {
	return strings.TrimSpace(strings.ToLower(s))
}

func Weighted(w http.ResponseWriter, req *http.Request) {
	AllowOriginLocalhsot(&w)
	AddDefaultHeader(&w)

	var wished SentWishes

	if req.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if req.Method != "POST" {
		http.Error(w, "Allowed Methods: [POST]", http.StatusBadRequest)
		return
	}

	body, err := io.ReadAll(req.Body)

	defer req.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err = json.Unmarshal(body, &wished)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	children := wished.Kids

	workshops := wished.Workshops

	workshopSlots := util.FlatMapSlice(workshops, func(w *Workshop) []WorkshopSlot {
		slots := make([]WorkshopSlot, 0, w.Capacity)
		for i := 0; i < w.Capacity; i++ {
			slot := WorkshopSlot{
				Workshop: *w,
				Nr:       i + 1,
			}
			slots = append(slots, slot)
		}
		return slots
	})

	matchingProblem := matching.MatchingProblem[Child, WorkshopSlot]{
		Lefts:  children,
		Rights: workshopSlots,
	}

	solutions, err := matchingProblem.SolveMany(1, func(c Child, w WorkshopSlot) (connect bool, weight float64) {
		for j := 0; j < 3; j++ {
			wi := c.Wishes[j]

			if NormalizeString(wi) == NormalizeString(w.Workshop.Name) {
				return true, GetEdgeWeight(j)
			}
		}

		return true, 10.0
	})

	if solutions == nil || len(solutions) < 1 {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	matchingEdges := solutions[0]

	response := ResponseSolution{
		Solution: matchingEdges,
	}

	if err != nil {
		fmt.Printf("%v\n", err)
		if strings.HasPrefix(err.Error(), "there is no perfect solution.") {
			response.Status = "no-perfect-solution"
		} else {
			response.Status = "error-unknown"
		}
	} else {
		response.Status = "ok"
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func main() {
	fmt.Println("Go server: Workshops-Backend started.")

	http.HandleFunc("/weighted", Weighted)

	http.ListenAndServe(":5000", nil)
}
