const data = [
  {
    title: "Position analysis of Grashof four bar mechanism",
    path: "exp-position-analysis-grashof-nitk",
    intern: "Karthik Ganapa, AJIET",
  },
  {
    title: "Velocity analysis of Grashof four bar mechanism",
    path: "exp-velocity-analysis-grashof-nitk",
    intern: "Karthik Ganapa, AJIET",
  },
  {
    title: "Acceleration analysis of Grashof four bar mechanism",
    path: "exp-acceleration-analysis-grashof-nitk",
    intern: "Adithya, AJIET",
  },
  {
    title: "Position analysis of NonGrashof four bar mechanism",
    path: "exp-position-analysis-nongrashof-nitk",
    intern: "Snehith, AJIET",
  },
  {
    title: "Velocity analysis of NonGrashof four bar mechanism",
    path: "exp-velocity-analysis-nongrashof-nitk",
    intern: "Adithya, AJIET",
  },
  {
    title: "Acceleration analysis of NonGrashof four bar mechanism",
    path: "exp-acceleration-analysis-nongrashof-nitk",
    intern: "Karthik Ganapa, AJIET",
  },
  {
    title: "Position analysis of Slider crank mechanism",
    path: "exp-position-analysis-slider-crank-nitk",
    intern: "Snehith, AJIET",
  },
  {
    title: "Velocity analysis of Slider crank mechanism",
    path: "exp-velocity-analysis-slider-crank-nitk",
    intern: "Druthi, AJIET",
  },
  {
    title: "Acceleration analysis of Slider crank mechanism",
    path: "exp-acceleration-analysis-slider-crank-nitk",
    intern: "Snehith, AJIET",
  },
  {
    title: "Position analysis of Slider crank mechanism with Offset",
    path: "exp-position-analysis-slider-crank-offset-nitk",
    intern: "Karthik Ganapa, AJIET",
  },
  {
    title: "Position analysis of Scotch Yoke Mechanism",
    path: "exp-position-analysis-scotch-yoke-nitk",
    intern: "Karthik Ganapa, AJIET",
  },
  {
    title: "Velocity analysis of Scotch Yoke Mechanism",
    path: "exp-velocity-analysis-scotch-yoke-nitk",
    intern: "Snehith, AJIET",
  },
  {
    title: "Acceleration analysis of Scotch Yoke Mechanism",
    path: "exp-acceleration-analysis-scotch-yoke-nitk",
    intern: "Adithya, AJIET",
  },
  {
    title: "Position analysis of Elliptical Trammel",
    path: "exp-position-analysis-elliptical-trammel-nitk",
    intern: "Karthik Ganapa, AJIET",
  },
  {
    title: "Hart Straight Line Mechanism",
    path: "exp-hart-straight-line-nitk",
    intern: "Adithya, AJIET",
  },
  {
    title: "Peaucellier Straight Line Mechanism",
    path: "exp-peaucellier-straight-line-nitk",
    intern: "Druthi, AJIET",
  },
  {
    title: "Elliptical Cam Mechanism",
    path: "exp-elliptical-cam-mechanism-nitk",
    intern: "Anaum Fathima, AJIET",
  },
  {
    title: "Eccentric Cam Mechanism",
    path: "exp-eccentric-cam-mechanism-nitk",
    intern: "Druthi, AJIET",
  },
  {
    title: "Klann Mechanism",
    path: "exp-klann-mechanism-nitk",
    intern: "Druthi, AJIET",
  },
  {
    title: "Jansen Linkage Model",
    path: "exp-jansen-linkage-model-nitk",
    intern: "Anaum Fathima, AJIET",
  },
  {
    title: "Chebyshev's Straight Line Mechanism",
    path: "exp-tchebichev-straight-line-nitk",
    intern: "Snehith, AJIET",
  },
  {
    title: "Whitworth Mechanism",
    path: "exp-whitworth-mechanism-nitk",
    intern: "Anaum Fathima, AJIET",
  },
  {
    title: "Crank and Slotted Mechanism",
    path: "exp-crank-slotted-mechanism-nitk",
    intern: "Anaum Fathima, AJIET",
  },
  {
    title: "Universal Joint",
    path: "exp-universal-joint-nitk",
    intern: "Karthik Ganapa, AJIET",
  },
];
const filterInput = function (val) {
  const filteredArray = data.filter(
    (d) =>
      d.title.toLowerCase().includes(val.toLowerCase()) ||
      d.intern.toLowerCase().includes(val.toLowerCase())
  );
  displayExperiments(filteredArray);
};

const searchInput = document.querySelector(".search__input");
searchInput.addEventListener("input", function (e) {
  filterInput(e.target.value);
});

const row = document.querySelector(".row");
const displayExperiments = function (data) {
  row.innerHTML = "";
  data.forEach((d) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.textContent = d.title;
    const intern = document.createElement("p");
    intern.classList.add("intern");
    intern.textContent = d.intern;
    const link = document.createElement("a");
    link.classList.add("link");
    link.href = `${d.path}/index.html`;
    link.textContent = "Click Here";
    col.appendChild(intern);
    col.appendChild(link);
    row.appendChild(col);
  });
};
displayExperiments(data);
