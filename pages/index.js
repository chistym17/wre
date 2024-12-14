'use client'

import React, { useState, useEffect,useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FileIcon,ArrowDownToDot, BookOpen, GraduationCap, Menu, X, Droplet, Mail, Building, ChevronRight, Search } from 'lucide-react'

import SEO from '@/components/SEO';


const WaveBackground = () => (

<div className="fixed inset-0 z-0 ">
      <svg    ref={waveRef}
    
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="none"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
        />
        <path
          d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,213.3C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="none"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
        />
        <path
          d="M0,128L48,138.7C96,149,192,171,288,186.7C384,203,480,213,576,208C672,203,768,181,864,181.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="rgba(59, 130, 246, 0.2)"
        />
      </svg>
    </div>
)

const BubbleAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(10)].map((_, i) => {
      // Generate random size for each bubble
      const size = Math.random() * 50 + 10; // Size between 10px and 60px
      return (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-60 shadow-lg"
          style={{
            width: size,
            height: size,
            left: `${Math.random() * 100}%`,
            bottom: 0,
            background: `radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(29, 78, 216, 0.3))`,
          }}
          animate={{
            y: [0, -1000], // Move upwards
            opacity: [0.3, 0], // Fade out
            scale: [1, Math.random() * 0.5 + 0.5], // Optional scaling effect
          }}
          transition={{
            duration: Math.random() * 10 + 10, // Random duration
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      );
    })}
  </div>
);

const Accordion = AccordionPrimitive.Root
const AccordionItem = AccordionPrimitive.Item
const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={forwardedRef}
      className={`${className} flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90`}
      {...props}
    >
      {children}
      <ChevronRight className="h-4 w-4 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"
const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitive.Content
    ref={forwardedRef}
    className={`${className} data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden text-sm transition-all`}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export default function WaterResourcesEngineering() {
  const [activeSection, setActiveSection] = useState("courses")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeLevelTerm, setActiveLevelTerm] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [openAccordions, setOpenAccordions] = useState([])
  const [courseData, setCourseData] = useState([])  // API course data state
  const [departmentData, setDepartmentData] = useState(null) // API department data state
  const [loading, setLoading] = useState(true) // loading state
  const [error, setError] = useState(null) // error state
    const waveRef = useRef(null); // Removed TypeScript type annotation
  
    useEffect(() => {
      const animate = () => {
        const time = Date.now() * 0.002;
        if (waveRef.current) {
          const paths = waveRef.current.querySelectorAll('path');
          paths.forEach((path, index) => {
            const length = path.getTotalLength();
            path.setAttribute('stroke-dasharray', `${length} ${length}`);
            path.setAttribute('stroke-dashoffset', (length * (time + index * 0.5) % length).toString());
          });
        }
        requestAnimationFrame(animate);
      };
      animate();
    }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      }
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch course data
        const courseResponse = await fetch('/api/courses')  // Replace with your API endpoint
        const courseData = await courseResponse.json()
        console.log('Fetched Course Data:', courseData) // Debugging: Check the structure
        setCourseData(courseData)
  
        // Fetch department data
        const departmentResponse = await fetch('/api/department')  // Replace with your API endpoint
        const departmentData = await departmentResponse.json()
        setDepartmentData(departmentData)
  
      } catch (err) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
  
    fetchData()
  }, [])
  

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const filteredCourseData = courseData.map(level => ({
    ...level,
    terms: level.terms.map(term => ({
      ...term,
      subjects: term.subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.notes.some(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })).filter(term => term.subjects.length > 0)
  })).filter(level => level.terms.length > 0)

  const handleLevelTermClick = (level, termIndex) => {
    setActiveSection("courses")
    setActiveLevelTerm(`${level}-${termIndex}`)
    setOpenAccordions([`level-${level}`, `term-${termIndex}`])
    if (isMobile) setIsSidebarOpen(false)
  }

  return (
    
    <div className="flex h-screen bg-gradient-to-br from-blue-900 to-blue-800 text-blue-100 font-sans relative overflow-hidden">
  <SEO
        title="WRE Materials - Made By Shovon"
        description="This website is for organizing the notes of Water Resources Engineering - CUET "
        ogImage="https://example.com/path/to/your/image.jpg"
        favicon="/favicon.ico" // Ensure your favicon is in the public directory
      />
<div className="fixed inset-0 z-0 ">
      <svg    ref={waveRef}
    
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="none"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="2"
        />
        <path
          d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,213.3C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="none"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="2"
        />
        <path
          d="M0,128L48,138.7C96,149,192,171,288,186.7C384,203,480,213,576,208C672,203,768,181,864,181.3C960,181,1056,203,1152,213.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="rgba(59, 130, 246, 0.2)"
        />
      </svg>
    </div>
      <BubbleAnimation />
      {/* Mobile menu button */}
      {isMobile && (
        <motion.button
          className="fixed top-4 left-4 z-50 p-2 bg-blue-500 rounded-full shadow-lg text-white"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-blue-800 shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-blue-700">
              <h1 className="text-2xl font-bold text-blue-100 mb-2">Water Resources</h1>
              <p className="text-sm text-blue-300">Department of Civil Engineering</p>
            </div>
            <div className="p-4">
              <Input
                type="search"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-blue-700 text-blue-100 placeholder-blue-300 border-blue-600"
              />
            </div>
            <ScrollArea className="h-[calc(100vh-180px)] flex flex-col">
  <nav className="px-4 py-2 flex-grow">
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="courses">
        <AccordionTrigger className="text-blue-100 hover:text-blue-200">
          <GraduationCap className="inline-block mr-2 w-5 h-5" />
          Courses
        </AccordionTrigger>
        <AccordionContent>
          {filteredCourseData.map((level) => (
            <Accordion type="single" collapsible key={level.level} className="ml-4">
              <AccordionItem value={`level-${level.level}`}>
                <AccordionTrigger className="text-blue-200 hover:text-blue-100">
                  Level {level.level}
                </AccordionTrigger>
                <AccordionContent>
                  {level.terms.map((term, termIndex) => (
                    <motion.button
                      key={termIndex}
                      className={`w-full text-left p-2 mb-1 rounded transition-colors ${
                        activeLevelTerm === `${level.level}-${termIndex}` ? "bg-blue-500 text-white" : "text-blue-200 hover:bg-blue-700"
                      }`}
                      onClick={() => handleLevelTermClick(level.level, termIndex)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowDownToDot className="inline-block mr-2 w-4 h-4" />
                      {term.name}
                    </motion.button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="department">
        <AccordionTrigger className="text-blue-100 hover:text-blue-200">
          <Building className="inline-block mr-2 w-5 h-5" />
          Department Info
        </AccordionTrigger>
        <AccordionContent>
          <motion.button
            className={`w-full text-left p-2 mb-1 rounded transition-colors ${
              activeSection === "department" ? "bg-blue-500 text-white" : "text-blue-200 hover:bg-blue-700"
            }`}
            onClick={() => {
              setActiveSection("department")
              if (isMobile) setIsSidebarOpen(false)
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Overview
          </motion.button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </nav>
  {/* This paragraph is positioned at the bottom of the ScrollArea */}
</ScrollArea>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className={`flex-1 p-8 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : ''} relative z-10`}>
        <AnimatePresence mode="wait">
          {activeSection === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions}>
                {filteredCourseData.map((level) => (
                  <AccordionItem value={`level-${level.level}`} key={level.level} className="mb-4">
                    <AccordionTrigger className="text-xl font-semibold text-blue-100 hover:text-blue-200 bg-blue-700 bg-opacity-50 p-4 rounded-t">
                      <GraduationCap className="w-6 h-6 mr-2" />
                      Level {level.level}
                    </AccordionTrigger>
                    <AccordionContent className="bg-blue-800 bg-opacity-50 rounded-b p-4">
                      <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="w-full mt-2">
                        {level.terms.map((term, termIndex) => (
                          <AccordionItem value={`term-${termIndex}`} key={termIndex} className="mb-2">
                            <AccordionTrigger className="text-lg font-medium text-blue-200 hover:text-blue-100 bg-blue-600 bg-opacity-50 p-3 rounded-t">
                            <ArrowDownToDot className="w-5 h-5 mr-2" />
                              {term.name}
                            </AccordionTrigger>
                            <AccordionContent className="bg-blue-700 bg-opacity-50 rounded-b p-3">
                              <div className="grid md:grid-cols-2 gap-4 mt-2">
                                {term.subjects.map((subject, subjectIndex) => (
                                  <motion.div
                                    key={subjectIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: subjectIndex * 0.1 }}
                                    className="bg-blue-600 bg-opacity-50 p-4 rounded"
                                  >
                                    <h3 className="text-lg font-semibold mb-2 text-blue-100 flex items-center">
                                      <Droplet className="w-4 h-4 mr-2" />
                                      {subject.name}
                                    </h3>
                                    <ul className="space-y-2">
                                      {subject.notes.map((note, noteIndex) => (
                                        <li key={noteIndex}>
                                          <a
                                            href={note.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-blue-200 hover:text-blue-100 transition-colors"
                                          >
                                            <FileIcon className="w-4 h-4" />
                                            <span>{note.title}</span>
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </motion.div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          )}

          {activeSection === "department" && (
            <motion.div
              key="department"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-blue-700 bg-opacity-50 p-6 rounded">
                <h2 className="text-2xl font-bold mb-4 text-blue-100">{departmentData.name}</h2>
                <p className="text-blue-200">{departmentData.description}</p>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-100">Faculty</h3>
              {departmentData.faculty.map((faculty, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-blue-700 bg-opacity-50 p-6 rounded mb-4"
                >
                  <h4 className="text-lg font-semibold mb-2 text-blue-100">{faculty.name}</h4>
                  <p className="text-blue-200 mb-2">{faculty.title}</p>
                  <p className="text-blue-200 mb-4">{faculty.bio}</p>
                  <div className="flex items-center mb-2">
                    <Mail className="w-4 h-4 mr-2 text-blue-300" />
                    <a href={`mailto:${faculty.email}`} className="text-blue-300 hover:underline">{faculty.email}</a>
                  </div>
                  <h5 className="text-md font-semibold mb-2 text-blue-100">Research Interests:</h5>
                  <ul className="list-disc list-inside text-blue-200">
                    {faculty.researchInterests.map((interest, interestIndex) => (
                      <li key={interestIndex}>{interest}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}