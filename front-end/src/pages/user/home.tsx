import Menu from "@/src/components/molecules/Menu";
import MenuL from "@/src/components/molecules/MenuL";
import Album from "@/src/components/atoms/Album";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
     
      <Menu />

     
      <section className="flex flex-1">
   
        <MenuL />

     
        <div className="flex-1 bg-black items-center justify-center">
        
          
        </div>
      </section>
    </main>
  );
}