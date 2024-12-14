export default function handler(req, res) {
  // Simulating CUET Department of Water Resources Engineering data
  const departmentData = {
    name: "Department of Water Resources Engineering, CUET",
    description: "The Department of Water Resources Engineering at CUET is dedicated to providing education and research in hydrology, hydraulic engineering, water resource management, and environmental engineering. The department focuses on sustainable water development in Bangladesh and beyond.",
    faculty: [
      {
        name: "Dr. Md. Monjurul Alam",
        title: "Professor and Head",
        bio: "Dr. Md. Monjurul Alam has been actively engaged in research and teaching in water resources engineering. His expertise includes flood control, river engineering, and integrated water management.",
        email: "monjurulalam@cuet.ac.bd",
        researchInterests: [
          "Flood Control",
          "River Engineering",
          "Integrated Water Resources Management"
        ]
      },
      {
        name: "Dr. Shamsuddin Ahmad",
        title: "Professor",
        bio: "Dr. Shamsuddin Ahmad has extensive experience in water resources planning, focusing on irrigation systems and flood risk management in Bangladesh. He has contributed significantly to research on water resource sustainability.",
        email: "shamsahmad@cuet.ac.bd",
        researchInterests: [
          "Irrigation Systems",
          "Flood Risk Management",
          "Water Resource Sustainability"
        ]
      },
      {
        name: "Dr. Mahmuda Khatun",
        title: "Associate Professor",
        bio: "Dr. Mahmuda Khatun's research focuses on the impact of climate change on water resources and the management of water systems in flood-prone regions. She has worked extensively on sustainable hydrology and watershed management.",
        email: "mahmudakhatun@cuet.ac.bd",
        researchInterests: [
          "Climate Change Impact",
          "Sustainable Hydrology",
          "Watershed Management"
        ]
      },
      {
        name: "Dr. Rafiqul Islam",
        title: "Assistant Professor",
        bio: "Dr. Rafiqul Islam specializes in computational fluid dynamics and hydraulic structure design. His research emphasizes flood mitigation and riverbank protection using advanced engineering techniques.",
        email: "rafiqulislam@cuet.ac.bd",
        researchInterests: [
          "Computational Fluid Dynamics",
          "Hydraulic Structures",
          "Flood Mitigation"
        ]
      }
    ]
  };

  // Responding with the department data as JSON
  res.status(200).json(departmentData);
}
