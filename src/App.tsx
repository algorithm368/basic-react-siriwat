import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Code,
  BookOpen,
  Zap,
  Layers,
  Settings,
  Eye,
  List,
  RefreshCw,
  Shield,
  Share2,
} from "lucide-react";

export default function ReactBasicsGuide() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  const icons: Record<string, typeof Layers> = {
    component: Layers,
    jsx: Code,
    props: Share2,
    state: RefreshCw,
    events: Zap,
    conditional: Eye,
    lists: List,
    effects: Settings,
    memo: Shield,
    context: BookOpen,
  };

  const sections = [
    {
      id: "component",
      title: "1. Component คืออะไร",
      badge: "พื้นฐาน",
      content: `ส่วนย่อย ๆ ของ UI (User Interface)
ทำหน้าที่เหมือน "ฟังก์ชัน" ที่สามารถสร้าง HTML ออกมาได้
แบ่งได้ 2 แบบหลัก ๆ:
• Function Component: เขียนด้วยฟังก์ชัน
• Class Component: เขียนด้วย class (ปัจจุบันนิยม function)`,
      code: `function Greeting() {
  return <h1>Hello, React!</h1>;
}`,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "jsx",
      title: "2. JSX คืออะไร",
      badge: "Syntax",
      content: `Syntax พิเศษที่เขียน HTML ผสม JavaScript ได้
JSX จะถูกแปลงเป็น JavaScript ก่อนทำงานจริง`,
      code: `const element = <h1>Hello, world!</h1>;

// เทียบเท่ากับ:
const element = React.createElement('h1', null, 'Hello, world!');`,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "props",
      title: "3. Prop คืออะไร",
      badge: "Data Flow",
      content: `เหมือน "พารามิเตอร์" ที่ส่งค่าไปให้ component ลูก
เป็น read-only (เปลี่ยนค่าใน component ไม่ได้)
ใช้เพื่อ customize หรือส่งข้อมูลเข้าไปใน component`,
      code: `function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// ใช้งาน
<Greeting name="John" />`,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "state",
      title: "4. State คืออะไร",
      badge: "Dynamic",
      content: `ตัวเก็บข้อมูลที่เปลี่ยนแปลงได้ภายใน component
ถ้า state เปลี่ยน -> component จะ render ใหม่

• useState(0) คือการกำหนดค่าเริ่มต้น
• setCount ใช้เปลี่ยนค่า count`,
      code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
      color: "from-orange-500 to-red-500",
    },
    {
      id: "events",
      title: "5. Event Handling",
      badge: "Interactive",
      content: `การผูก action กับ event ต่าง ๆ เช่น click, submit`,
      code: `function Button() {
  function handleClick() {
    alert('Button clicked!');
  }

  return <button onClick={handleClick}>Click me</button>;
}`,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "conditional",
      title: "6. Conditional Rendering",
      badge: "Logic",
      content: `การ render UI เฉพาะบางเงื่อนไข`,
      code: `function User({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}`,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "lists",
      title: "7. List Rendering",
      badge: "Loops",
      content: `การวนลูปแสดงผลข้อมูลใน list
ต้องใส่ key เพื่อให้ React จัดการ efficiently`,
      code: `function NameList({ names }) {
  return (
    <ul>
      {names.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
}`,
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: "effects",
      title: "8. useEffect คืออะไร",
      badge: "Side Effects",
      content: `Hook สำหรับจัดการ side effect (ดึง API, ตั้ง timer ฯลฯ)
ทำงานคล้าย componentDidMount, componentDidUpdate ใน class
ถ้า [] ว่าง -> ทำแค่ตอน mount (เหมือน componentDidMount)`,
      code: `import { useEffect } from 'react';

function Example() {
  useEffect(() => {
    console.log('Component mounted or updated');

    return () => {
      console.log('Cleanup here');
    };
  }, []);
}`,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "memo",
      title: "9. Memoization",
      badge: "Performance",
      content: `ป้องกันไม่ให้ component ลูก render ใหม่โดยไม่จำเป็น
ใช้ React.memo กับ component ที่รับ prop แล้วไม่ค่อยเปลี่ยน`,
      code: `const Child = React.memo(function Child({ value }) {
  console.log('Child rendered');
  return <div>{value}</div>;
});`,
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "context",
      title: "10. Context คืออะไร",
      badge: "Global State",
      content: `วิธีส่งข้อมูลข้ามหลาย component โดยไม่ต้องส่งผ่าน prop ทีละชั้น`,
      code: `const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = React.useContext(ThemeContext);
  return <button className={theme}>Theme Button</button>;
}`,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const summaryTable = [
    ["Component", "สร้าง UI เป็นส่วน ๆ"],
    ["JSX", "HTML ใน JavaScript"],
    ["Prop", "ส่งข้อมูลให้ component"],
    ["State", "ข้อมูลที่เปลี่ยนได้ใน component"],
    ["Event Handling", "จัดการ event ผู้ใช้"],
    ["Conditional Render", "render แบบมีเงื่อนไข"],
    ["List Render", "วนลูป render ข้อมูล"],
    ["useEffect", "จัดการ side effect"],
    ["Memo", "ป้องกัน render ซ้ำ"],
    ["Context", "ส่งข้อมูลข้าม component"],
  ];

  useEffect(() => {
    const newProgress = (completedSections.size / sections.length) * 100;
    setProgress(newProgress);
  }, [completedSections, sections.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    if (activeSection !== sectionId) {
      setCompletedSections((prev) => new Set([...prev, sectionId]));
    }
  };

  const themeClasses = darkMode ? "dark" : "";
  const bgClass = darkMode
    ? "bg-gray-900"
    : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50";
  const textClass = darkMode ? "text-white" : "text-gray-800";

  return (
    <div
      className={`min-h-screen font-mono transition-all duration-500 ${bgClass} ${themeClasses}`}
    >
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${darkMode ? "bg-blue-400" : "bg-blue-200"} rounded-full opacity-20 animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header with controls */}
        <div className="mb-12 text-center">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div
                className={`text-sm font-bold px-3 py-1 rounded-full ${darkMode ? "bg-gray-800 text-green-400" : "bg-green-100 text-green-800"}`}
              >
                {completedSections.size}/{sections.length} ทำแล้ว
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${darkMode ? "bg-yellow-500 text-gray-900" : "bg-gray-800 text-yellow-400"} hover:scale-110`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          <div className="relative">
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${textClass} transform transition-all duration-1000`}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                📌 React
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl">
                พื้นฐานที่ควรรู้
              </span>
            </h1>
            <p
              className={`text-lg sm:text-xl ${darkMode ? "text-gray-300" : "text-gray-600"} mb-8`}
            >
              คู่มือ React สำหรับผู้เริ่มต้น พร้อมตัวอย่างและการโต้ตอบ
            </p>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid gap-6 mb-12">
          {sections.map((section, index) => {
            const Icon = icons[section.id];
            const isActive = activeSection === section.id;
            const isCompleted = completedSections.has(section.id);
            const isInView = isVisible[section.id];

            return (
              <div
                key={section.id}
                id={section.id}
                className={`transform transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:scale-[1.02] ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                      : "bg-white/80 backdrop-blur-sm border-white/50 hover:border-white/80 shadow-xl hover:shadow-2xl"
                  } ${isActive ? "ring-4 ring-blue-500/50" : ""}`}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 text-left transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${section.color} text-white transform group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon size={24} />
                        </div>
                        <div>
                          <h2
                            className={`text-lg sm:text-xl font-bold ${textClass} group-hover:text-blue-600 transition-colors duration-300`}
                          >
                            {section.title}
                          </h2>
                          <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2 ${
                              darkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {section.badge}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {isCompleted && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm animate-bounce">
                            ✓
                          </div>
                        )}
                        <div
                          className={`transform transition-transform duration-300 ${isActive ? "rotate-90" : ""} ${textClass}`}
                        >
                          {isActive ? (
                            <ChevronDown size={20} />
                          ) : (
                            <ChevronRight size={20} />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {isActive && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div
                        className={`h-px bg-gradient-to-r ${section.color} mb-6 opacity-30`}
                      />

                      <div className="space-y-6">
                        <div
                          className={`${darkMode ? "text-gray-300" : "text-gray-700"} whitespace-pre-line leading-relaxed text-base`}
                        >
                          {section.content}
                        </div>

                        {section.code && (
                          <div className="relative group w-full">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <div
                              className={`relative ${darkMode ? "bg-gray-900" : "bg-gray-900"} text-gray-100 rounded-xl border border-gray-700 w-full min-w-0`}
                            >
                              <div className="flex items-center justify-between p-4 pb-0">
                                <div className="flex space-x-2">
                                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <span className="text-xs text-gray-400 hidden sm:block">
                                  React JSX
                                </span>
                              </div>
                              <div className="overflow-x-auto p-4 pt-2">
                                <pre className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap sm:whitespace-pre break-words sm:break-normal max-w-full">
                                  <code className="language-jsx">
                                    {section.code}
                                  </code>
                                </pre>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Table */}
        <div
          className={`rounded-2xl border-2 overflow-hidden transition-all duration-500 ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white/80 backdrop-blur-sm border-white/50 shadow-xl"
          }`}
        >
          <div
            className={`p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white`}
          >
            <h2 className="text-2xl font-bold flex items-center">
              <BookOpen className="mr-3" size={28} />
              สรุปทั้งหมด
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                <tr>
                  <th className={`text-left py-4 px-6 font-bold ${textClass}`}>
                    หัวข้อ
                  </th>
                  <th className={`text-left py-4 px-6 font-bold ${textClass}`}>
                    หน้าที่
                  </th>
                </tr>
              </thead>
              <tbody>
                {summaryTable.map(([topic, description], index) => (
                  <tr
                    key={index}
                    className={`border-b transition-colors duration-200 ${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-700/50"
                        : "border-gray-100 hover:bg-blue-50/50"
                    }`}
                  >
                    <td className={`py-4 px-6 font-semibold ${textClass}`}>
                      {topic}
                    </td>
                    <td
                      className={`py-4 px-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div
            className={`inline-block p-6 rounded-2xl ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white/80 backdrop-blur-sm border border-white/50 shadow-xl"
            }`}
          >
            <p
              className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-lg`}
            >
              จัดทำมาเพื่อการเรียนรู้ React เบื้องต้น
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              {["📝", "🎨", "⚡", "🔧"].map((emoji, i) => (
                <div
                  key={i}
                  className="text-2xl animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `,
        }}
      />
    </div>
  );
}
