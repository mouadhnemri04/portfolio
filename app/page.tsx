import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { About } from "@/components/site/about"
import { Experience } from "@/components/site/experience"
import { Education } from "@/components/site/education"
import { Projects } from "@/components/site/projects"
import { Certifications, Languages, Skills } from "@/components/site/skills-certs"
import { Contact, Footer } from "@/components/site/contact"
import { ChatAssistant } from "@/components/site/chat-assistant"

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Certifications />
        <Languages />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </>
  )
}
