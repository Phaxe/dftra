import Navbar from "./(components)/Navbar/Navbar";
import Sidebar from "./(components)/Sidebar/Sidebar";


export default function Home() {
  return (
   <div className="flex flex-col items-center justify-center">
    <Navbar/>
    <Sidebar/>
   </div>
  );
}
