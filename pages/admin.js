'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronLeft, ChevronRight, Layers, BookOpen, Droplet, User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/router';

const WaveBackground = () => (
  <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
      <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
);

export default function WaterCourseAdmin() {
  const [levels, setLevels] = useState([]);
  const [activeLevel, setActiveLevel] = useState(null);
  const [activeTerm, setActiveTerm] = useState(null);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDescription, setNewCourseDescription] = useState('');
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectDescription, setNewSubjectDescription] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const initialLevels = Array.from({ length: 4 }, (_, i) => ({
      id: `level-${i + 1}`,
      name: `Level ${i + 1}`,
      terms: Array.from({ length: 2 }, (_, j) => ({
        id: `level-${i + 1}-term-${j + 1}`,
        name: `Term ${j + 1}`,
        courses: []
      }))
    }));
    setLevels(initialLevels);
    setActiveLevel(initialLevels[0].id);
    setActiveTerm(initialLevels[0].terms[0].id);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addCourse = () => {
    if (newCourseName.trim() && activeLevel && activeTerm) {
      setLevels(levels.map(level => 
        level.id === activeLevel
          ? {
              ...level,
              terms: level.terms.map(term => 
                term.id === activeTerm
                  ? {
                      ...term,
                      courses: [...term.courses, { id: Date.now().toString(), name: newCourseName, description: newCourseDescription, subjects: [] }]
                    }
                  : term
              )
            }
          : level
      ));
      setNewCourseName('');
      setNewCourseDescription('');
    }
  };

  const deleteCourse = (courseId) => {
    setLevels(levels.map(level => ({
      ...level,
      terms: level.terms.map(term => ({
        ...term,
        courses: term.courses.filter(course => course.id !== courseId)
      }))
    })));
  };

  const addSubject = (courseId) => {
    if (newSubjectName.trim()) {
      setLevels(levels.map(level => ({
        ...level,
        terms: level.terms.map(term => ({
          ...term,
          courses: term.courses.map(course => 
            course.id === courseId
              ? {
                  ...course,
                  subjects: [...course.subjects, { id: Date.now().toString(), name: newSubjectName, description: newSubjectDescription }]
                }
              : course
          )
        }))
      })));
      setNewSubjectName('');
      setNewSubjectDescription('');
    }
  };

  const deleteSubject = (courseId, subjectId) => {
    setLevels(levels.map(level => ({
      ...level,
      terms: level.terms.map(term => ({
        ...term,
        courses: term.courses.map(course => 
          course.id === courseId
            ? {
                ...course,
                subjects: course.subjects.filter(subject => subject.id !== subjectId)
              }
            : course
        )
      }))
    })));
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-cyan-900 to-blue-900 text-blue-100 overflow-hidden">
      <WaveBackground />
      
      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? { x: "-100%" } : { x: 0 }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-cyan-800 bg-opacity-50 backdrop-blur-md w-64 p-6 absolute md:relative inset-y-0 left-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Water Courses</h1>
          <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(false)} className="md:hidden">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <nav className="space-y-2">
          {levels.map(level => (
            <div key={level.id}>
              <Button
                variant={activeLevel === level.id ? 'secondary' : 'ghost'}
                className="w-full justify-start mb-2 bg-cyan-700 bg-opacity-50 hover:bg-cyan-600"
                onClick={() => {
                  setActiveLevel(level.id);
                  setActiveTerm(level.terms[0].id);
                  if (isMobile) setIsSidebarOpen(false);
                }}
              >
                <Layers className="mr-2 h-4 w-4" />
                {level.name}
              </Button>
              {activeLevel === level.id && (
                <div className="ml-4 space-y-2">
                  {level.terms.map(term => (
                    <Button
                      key={term.id}
                      variant={activeTerm === term.id ? 'secondary' : 'ghost'}
                      className="w-full justify-start bg-cyan-600 bg-opacity-50 hover:bg-cyan-500"
                      onClick={() => {
                        setActiveTerm(term.id);
                        if (isMobile) setIsSidebarOpen(false);
                      }}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      {term.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-cyan-800 bg-opacity-50 backdrop-blur-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(true)} className="mr-4">
                <Menu className="h-6 w-6" />
              </Button>
            )}
            <h2 className="text-xl font-semibold flex items-center">
              <Droplet className="mr-2 h-5 w-5" />
              {levels.find(l => l.id === activeLevel)?.name} - 
              {levels.find(l => l.id === activeLevel)?.terms.find(t => t.id === activeTerm)?.name}
            </h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-cyan-900 bg-opacity-50 backdrop-blur-md p-6">
          <Card className="bg-cyan-800 bg-opacity-50 backdrop-blur-md border-cyan-700">
            <CardHeader>
              <CardTitle className="text-cyan-100">Manage Courses</CardTitle>
              <CardDescription className="text-cyan-200">Add and edit courses for the selected level and term</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <Label htmlFor="new-course-name" className="mb-2 block text-cyan-100">Course Name</Label>
                  <Input
                    id="new-course-name"
                    type="text"
                    placeholder="Enter course name"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="bg-cyan-700 bg-opacity-50 text-cyan-100 border-cyan-600 placeholder-cyan-300"
                  />
                </div>
                <div>
                  <Label htmlFor="new-course-description" className="mb-2 block text-cyan-100">Course Description</Label>
                  <Input
                    id="new-course-description"
                    type="text"
                    placeholder="Enter course description"
                    value={newCourseDescription}
                    onChange={(e) => setNewCourseDescription(e.target.value)}
                    className="bg-cyan-700 bg-opacity-50 text-cyan-100 border-cyan-600 placeholder-cyan-300"
                  />
                </div>
              </div>
              <Button onClick={addCourse} className="w-full bg-cyan-600 hover:bg-cyan-500 mb-8">
                <Plus className="w-4 h-4 mr-2" /> Add Course
              </Button>
              <ScrollArea className="h-[400px]">
                <AnimatePresence>
                  {levels.find(l => l.id === activeLevel)?.terms.find(t => t.id === activeTerm)?.courses.map((course) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="mb-4"
                    >
                      <div className="flex flex-col bg-cyan-700 bg-opacity-50 p-4 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-cyan-100">{course.name}</h3>
                            <p className="text-sm text-cyan-300">{course.description}</p>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteCourse(course.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-900 bg-opacity-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete course</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {/* Subjects management */}
                        <div className="mt-4">
                          <Label htmlFor={`new-subject-name-${course.id}`} className="mb-2 block text-cyan-100">Subject Name</Label>
                          <Input
                            id={`new-subject-name-${course.id}`}
                            type="text"
                            placeholder="Enter subject name"
                            value={newSubjectName}
                            onChange={(e) => setNewSubjectName(e.target.value)}
                            className="bg-cyan-700 bg-opacity-50 text-cyan-100 border-cyan-600 placeholder-cyan-300"
                          />
                          <Label htmlFor={`new-subject-description-${course.id}`} className="mb-2 block text-cyan-100">Subject Description</Label>
                          <Input
                            id={`new-subject-description-${course.id}`}
                            type="text"
                            placeholder="Enter subject description"
                            value={newSubjectDescription}
                            onChange={(e) => setNewSubjectDescription(e.target.value)}
                            className="bg-cyan-700 bg-opacity-50 text-cyan-100 border-cyan-600 placeholder-cyan-300"
                          />
                          <Button onClick={() => addSubject(course.id)} className="mt-2 w-full bg-cyan-600 hover:bg-cyan-500">
                            <Plus className="w-4 h-4 mr-2" /> Add Subject
                          </Button>
                        </div>

                        <div className="mt-4">
                          <h4 className="text-cyan-100">Subjects</h4>
                          <AnimatePresence>
                            {course.subjects.map(subject => (
                              <motion.div
                                key={subject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-between bg-cyan-600 bg-opacity-50 p-2 rounded-md mt-2"
                              >
                                <div>
                                  <p className="text-sm font-semibold text-cyan-100">{subject.name}</p>
                                  <p className="text-xs text-cyan-300">{subject.description}</p>
                                </div>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteSubject(course.id, subject.id)}
                                        className="text-red-400 hover:text-red-300 hover:bg-red-900 bg-opacity-50"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delete subject</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </ScrollArea>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
