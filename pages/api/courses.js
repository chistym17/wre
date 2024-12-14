// pages/api/courses.js

export default function handler(req, res) {
    const courses = [
      {
        level: 1,
        terms: [
          {
            name: "Term 1",
            subjects: [
              {
                code: "WRE101",
                name: "Introduction to Water Resources Engineering",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/notes1" }
                ]
              },
              {
                code: "ENG101",
                name: "Basic Engineering Mechanics",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/eng101/notes" }
                ]
              }
            ]
          },
          {
            name: "Term 2",
            subjects: [
              {
                code: "WRE102",
                name: "Advanced Hydrology",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/notes2" }
                ]
              },
              {
                code: "CIV102",
                name: "Fundamentals of Civil Engineering",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/civ102/notes" }
                ]
              }
            ]
          }
        ]
      },
      {
        level: 2,
        terms: [
          {
            name: "Term 1",
            subjects: [
              {
                code: "WRE201",
                name: "Hydraulic Engineering",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/wre201/notes" }
                ]
              },
              {
                code: "CIV201",
                name: "Structural Analysis",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/civ201/notes" }
                ]
              }
            ]
          },
          {
            name: "Term 2",
            subjects: [
              {
                code: "WRE202",
                name: "Water Treatment Systems",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/wre202/notes" }
                ]
              },
              {
                code: "ENV202",
                name: "Environmental Impact Assessment",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/env202/notes" }
                ]
              }
            ]
          }
        ]
      },
      {
        level: 3,
        terms: [
          {
            name: "Term 1",
            subjects: [
              {
                code: "WRE301",
                name: "River Engineering",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/wre301/notes" }
                ]
              },
              {
                code: "CIV301",
                name: "Geotechnical Engineering",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/civ301/notes" }
                ]
              }
            ]
          },
          {
            name: "Term 2",
            subjects: [
              {
                code: "WRE302",
                name: "Coastal Engineering",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/wre302/notes" }
                ]
              },
              {
                code: "ENV302",
                name: "Environmental Policy and Law",
                notes: [
                  { title: "Lecture Notes", url: "http://example.com/env302/notes" }
                ]
              }
            ]
          }
        ]
      }
    ];
  
    res.status(200).json(courses);
  }
  