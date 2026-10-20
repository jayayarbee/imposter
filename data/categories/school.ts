import type { CategorySource } from "@/types";

export const school: CategorySource = {
  id: "school",
  label: "School",
  description: "Subjects, stationery, examinations, classroom items and student life.",
  // Individual words for classic mode ("a|b|c" per difficulty).
  words: {
    easy: "Pencil|Notebook|Blackboard|Homework|Eraser|Ruler|Recess|Classroom|Textbook|Pen|Whiteboard|Chalk|Duster|Bench|Desk|Lunch box|School bus|Principal|Class monitor|Attendance|Timetable|Marks|Exam|Sports day|Annual day|Picnic|Tuition|Holiday|Result|School bell|Roll call|Assembly",
    medium: "Algebra|Chemistry|Geography|Detention|Report card|Calculator|Science fair|Final exam|Uniform|Library|Geometry|Physics|Biology|Civics|Economics|Sanskrit|Hindi|Playground|Science lab|Computer lab|PT period|Roll number|Admit card|Board exams|Entrance exam|Scholarship|Hostel|Prefect|Head boy|Marksheet|Spelling bee|Quiz competition|Debate club|NCC|NSS",
    hard: "Trigonometry|Syllabus|Valedictorian|Plagiarism|Rote learning|Semester|Convocation|Calculus|Etymology|Thesis|Dissertation|Statistics|Pythagoras theorem|Logarithm|Matrix|Integration|Differential equation|Organic chemistry|Thermodynamics|Genetics|Mitosis|Meiosis|Ohm's law|Periodic table|Bunsen burner|Litmus paper|Quadratic equation|Probability|Vectors|Phonetics|Prepositions|Idioms|Précis|Viva voce|Alma mater|Rank holder|Pedagogy|Rubric|Curriculum",
  },
  // Legacy "A~B" sibling pairs were retired in favour of the association pairs below.
  pairs: { easy: "", medium: "", hard: "" },
  // Association pairs: "Word A~Word B|relationship|explanation|tag,tag"
  associations: {
    easy: [
      "Homework~Dog ate it|school-experience|The classic excuse for missing homework|global",
      "School bell~Home time|school-experience|The last bell means everyone rushes out|global",
      "Report card~Parent's signature|school-experience|It must be signed and returned|indian",
      "Textbook~Peacock feather|school-experience|Many Indian students keep one between pages for luck|indian",
      "Classroom~Roll call|school-experience|Names called out each morning|global",
      "Lunch box~Swapping|school-experience|Trading food with friends|global",
      "Exam~Hall ticket|school-experience|The admit card needed to enter|indian",
      "Assembly~Pledge|school-experience|India is my country is recited each morning|indian",
      "Notebook~Last page doodles|school-experience|The back pages fill with drawings|global",
      "Blackboard~Duster|school-experience|Used to wipe the board clean|global",
    ],
    medium: [
      "Algebra~Solve for x|school-experience|The hunt for the unknown|global",
      "Chemistry~Periodic table|school-experience|The chart of elements on the wall|global",
      "Geography~Atlas|school-experience|The book of maps|global",
      "Detention~The Breakfast Club|film-fact|The 1985 film set during Saturday detention|global",
      "Science fair~Baking soda volcano|school-experience|The classic project|global",
      "Final exam~All-nighter|school-experience|Studying through the night|global",
      "Library~Silence please|school-experience|The librarian's constant rule|global",
      "Physics~Newton's apple|person-event|The legend of the apple and gravity|global",
      "Marksheet~Percentage|school-experience|The number parents ask about|indian",
      "Calculator~Scientific mode|tech-feature|Trig and log functions for higher classes|global",
    ],
    hard: [
      "Trigonometry~SOH CAH TOA|school-experience|The mnemonic for sine, cosine and tangent|global",
      "Syllabus~NCERT|school-experience|The textbooks that define the CBSE syllabus|indian",
      "Plagiarism~Turnitin|tech-feature|Software that checks for copied work|global",
      "Rote learning~Mugging up|school-experience|Memorising without understanding|indian",
      "Convocation~Mortarboard|fashion-feature|The flat graduation cap|global",
      "Calculus~Newton and Leibniz|person-event|They developed it independently|global",
      "Etymology~Entomology|wordplay|Often confused with the study of insects|global",
      "Thesis~Viva|school-experience|The oral examination that defends it|global",
      "Valedictorian~Farewell speech|school-experience|Gives the graduation address|global",
      "Semester~Credit hours|school-experience|How college courses are counted|global",
    ],
  },
};
