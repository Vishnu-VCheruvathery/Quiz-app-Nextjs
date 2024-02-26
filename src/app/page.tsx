import Link from "next/link";

export default function Home() {
  return (
     <>
      
             <main className="flex flex-col items-center justify-center min-h-screen">
             <h1 className="text-3xl">Quiz</h1>
             <Link href='/quiz'>Take the Quiz</Link>
             <Link href='/create'>Create a Quiz</Link>             
             
      </main>
     </>

   
  );
}
