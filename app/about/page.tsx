import Image from 'next/image'

const teamMembers = [
  {
    name: "Khansa Farras Callista Armandsyah",
    university: "Universitas Negeri Jakarta - Fisika",
    role: "Machine Learning Cohort",
    photo: "/assets/khansa.png"
  },
  {
    name: "Adrian Alfajri",
    university: "Universitas Trisakti - Informatika",
    role: "Machine Learning Cohort",
    photo: "/assets/adrian.png"
  },
  {
    name: "Adyatma Imam Susanto",
    university: "UPN Veteran Jawa Timur - Informatika",
    role: "Machine Learning Cohort",
    photo: "/assets/tama.png"
  },
  {
    name: "Mohamad Ifdhal Hassan Noor",
    university: "Institut Pertanian Bogor - Fisika",
    role: "Machine Learning Cohort",
    photo: "/assets/ifdhal.png"
  },
  {
    name: "Ananda Sheva Hidayat",
    university: "Universitas Lampung - Ilmu Komputer",
    role: "Cloud Computing Cohort",
    photo: "/assets/sheva.png"
  },
  {
    name: "Alverta Orlandia Prijono",
    university: "Politeknik Negeri Jakarta - Teknik Elektro",
    role: "Cloud Computing Cohort",
    photo: "/assets/ola.png"
  },
]

export default function About() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12" style={{ marginTop: '50px' }}>Get to Know About Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="card text-center p-4 shadow-lg rounded-lg transition-transform transform hover:scale-95">
              <img src={member.photo} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h2 className="text-xl font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.university}</p>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>

        <p className="text-center mb-12 text-justify">
          This Vehicle Counter Application is a collaborative project by students from various universities, combining their expertise in machine learning, cloud computing to designed to revolutionize traffic monitoring and management.
          It utilizes Python, TensorFlow.js, and YOLOv11 for real-time vehicle detection and tracking, delivering precise counting data even in complex scenarios. The system features a user-friendly Next.js-based frontend, enabling seamless visualization of insights. 
          The backend leverages shacdn, TypeScript, and MySQL for robust data management, and the application is deployed on Google Cloud to ensure scalability and efficiency. 
          Our goal is to provide actionable traffic insights for smarter urban development.
        </p>

        <div className="flex justify-center space-x-4">
          <Image src="/assets/tf.png" alt="TensorFlow" width={40} height={40} />
          <Image src="/assets/mysql.png" alt="YOLO" width={40} height={40} />
          <Image src="/assets/ts.png" alt="TypeScript" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}