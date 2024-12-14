import { Info, Facebook, Twitter, Linkedin, Github } from "lucide-react"; // Importing Github icon
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = () => {
  return (
    <Card
      style={{ zIndex: 10000 }} // Applying custom z-index
      className="fixed bottom-4 right-4 w-64 bg-blue-800 bg-opacity-50 text-white shadow-lg transition-all hover:shadow-xl"
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 mt-1 text-white" />
          <div className="text-sm">
            <p className="font-medium">Developed by Shovon</p>
            <p className="text-gray-300">
              Department of Water Resources Engineering, CUET'21
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 p-4 pt-0">
        <TooltipProvider>
          {/* Facebook Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="w-4 h-4 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black">
              <p>Facebook</p>
            </TooltipContent>
          </Tooltip>

          {/* Twitter Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="w-4 h-4 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black">
              <p>Twitter</p>
            </TooltipContent>
          </Tooltip>

          {/* LinkedIn Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black">
              <p>LinkedIn</p>
            </TooltipContent>
          </Tooltip>

          {/* GitHub Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="w-4 h-4 text-white" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-black">
              <p>GitHub</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default Footer;
