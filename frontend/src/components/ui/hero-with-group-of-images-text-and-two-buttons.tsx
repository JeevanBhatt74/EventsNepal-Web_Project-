import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">Let's Create Experiences</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                This is the start of something!
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Managing events today is already tough. Avoid further
                complications by ditching outdated, tedious methods. Our goal is
                to streamline event management, making it easier and faster than
                ever.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Link to="/sign-up">
                <Button size="lg" className="gap-4">
                  Sign up here <MoveRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-muted rounded-md aspect-square overflow-hidden">
              <img src="/Napathey.png" className="h-full w-full object-cover" />
            </div>
            <div className="bg-muted rounded-md row-span-2 overflow-hidden">
              <img src="/axe-band.jpg" className="h-full w-full object-cover" />
            </div>
            <div className="bg-muted rounded-md aspect-square overflow-hidden">
              <img src="/Concert.png" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
