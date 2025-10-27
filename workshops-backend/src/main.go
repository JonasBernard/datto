package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/JonasBernard/min-cost-max-flow/matching"
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
	Wishes [6]string `json:"wishes"`
	Id     string    `json:"id"`
}

func (c Child) String() string {
	return c.Name
}

func (w Workshop) String() string {
	return fmt.Sprintf("%v (cap %v)", w.Name, w.Capacity)
}

type Workshop struct {
	Name     string `json:"name"`
	Capacity int    `json:"capacity,string"`
}

type SentWishes struct {
	Kids      []Child
	Workshops []Workshop
	Settings  Settings `json:"settings,omitempty"`
}

type Settings struct {
	AllowAssignmentToNonWishedWorkshop bool `json:"allowAssignmentToNonWishedWorkshop"`
	NumberOfWishesPerKid int `json:"numberOfWishesPerKid"`
}

type ResponseSolution struct {
	Solution []matching.MatchingEdge[Child, Workshop] `json:"solution"`
	Status   string                                   `json:"status"`
}

func AllowOriginLocalhost(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func AddDefaultHeader(w *http.ResponseWriter) {
	headers := (*w).Header()
	headers.Add("Vary", "Origin")
	headers.Add("Vary", "Access-Control-Request-Method")
	headers.Add("Vary", "Access-Control-Request-Headers")
	headers.Add("Access-Control-Allow-Headers", "Content-Type, Origin, Accept, token")
	headers.Add("Access-Control-Allow-Methods", "POST, OPTIONS")
}

func NormalizeString(s string) string {
	return strings.TrimSpace(strings.ToLower(s))
}

func Weighted() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		SolveGroupProblem(w, r, func(i int) float64 {
			return float64(i * i)
		})
	}
}

func Unweighted() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		SolveGroupProblem(w, r, func(i int) float64 {
			return 1
		})
	}
}

func SolveGroupProblem(w http.ResponseWriter, req *http.Request, getEdgeWeight func(int) float64) {
	AllowOriginLocalhost(&w)
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

	allowAssignmentToNonWishedWorkshop := wished.Settings.AllowAssignmentToNonWishedWorkshop
	numberOfWishesPerKid := wished.Settings.NumberOfWishesPerKid

	matchingProblem := matching.MatchingProblem[Child, Workshop]{
		Lefts:  children,
		Rights: workshops,
	}

	solutions, err := matchingProblem.SolveMany(1, func(c Child, w Workshop) (connect bool, weight float64) {
		for j := 0; j < numberOfWishesPerKid; j++ {
			wi := c.Wishes[j]

			if NormalizeString(wi) == NormalizeString(w.Name) {
				return true, getEdgeWeight(j)
			}
		}

		// if false, 10 will be ignored
		return allowAssignmentToNonWishedWorkshop, float64((numberOfWishesPerKid+1)*(numberOfWishesPerKid+1))
	}, func(w Workshop) (capacity float64) {
		return float64(w.Capacity)
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
	fmt.Println("Go server: Workshops-Backend started. Listening on :5000")

	http.HandleFunc("/weighted", Weighted())
	http.HandleFunc("/unweighted", Unweighted())

	http.ListenAndServe(":5000", nil)
}
