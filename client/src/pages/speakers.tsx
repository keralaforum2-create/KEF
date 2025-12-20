import { ArrowLeft, X, Presentation } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollFadeUp } from "@/lib/animations";
import { useState } from "react";
import ajilImage from "@assets/AJIL_HILITE_1766212685898.jpg";
import alfanImage from "@assets/ALFAN_1766212690930.jpg";
import jaizalImage from "@assets/JAIZAL_ALI_1766212695708.jpg";
import jishnuImage from "@assets/JISHNU_ELANCE_1766212701558.jpg";
import naseefImage from "@assets/NASEEF_NEERUTTICHALI_1766212707478.jpg";
import noureenImage from "@assets/NOUREEN_AYSHA_1766212713911.jpg";
import rameezImage from "@assets/RAMEEZ_MOIDU_1766212721141.jpg";
import rayhanImage from "@assets/RAYHAN_MYOP_1766212726903.jpg";
import shahadImage from "@assets/SHAHAD_KENZA_1766212732791.jpg";
import thajudeenImage from "@assets/THAJUDEEN_ABOOBAKER_1766212745960.jpg";
import umerImage from "@assets/UMER_ABDUSSALAM_1766212760671.jpg";
import shrikumarImage from "@assets/V_A_SHRIKUMAR_1766212766568.jpg";

const speakers = [
  {
    id: 1,
    image: ajilImage,
  },
  {
    id: 2,
    image: alfanImage,
  },
  {
    id: 3,
    image: jaizalImage,
  },
  {
    id: 4,
    image: jishnuImage,
  },
  {
    id: 5,
    image: naseefImage,
  },
  {
    id: 6,
    image: noureenImage,
  },
  {
    id: 7,
    image: rameezImage,
  },
  {
    id: 8,
    image: rayhanImage,
  },
  {
    id: 9,
    image: shahadImage,
  },
  {
    id: 10,
    image: thajudeenImage,
  },
  {
    id: 11,
    image: umerImage,
  },
  {
    id: 12,
    image: shrikumarImage,
  },
];

function SpeakerModal({ speaker, onClose }: { speaker: typeof speakers[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose} data-testid="modal-speaker-backdrop">
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} data-testid="modal-speaker">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
          data-testid="button-close-modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        <img 
          src={speaker.image} 
          alt="Speaker poster"
          className="w-full h-auto object-cover"
          data-testid={`img-speaker-${speaker.id}`}
        />
      </div>
    </div>
  );
}

export default function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<typeof speakers[0] | null>(null);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <ScrollFadeUp>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900" data-testid="text-speakers-title">
              Our <span className="text-red-600">Speakers</span>
            </h1>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.1}>
            <p className="text-lg text-gray-600 max-w-2xl">
              Meet the industry leaders and experts who will be sharing their insights and experiences at Kerala Startup Fest 2026.
            </p>
          </ScrollFadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker, index) => (
            <ScrollFadeUp key={speaker.id} delay={index * 0.05}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md"
                onClick={() => setSelectedSpeaker(speaker)}
                data-testid={`card-speaker-${speaker.id}`}
              >
                <img 
                  src={speaker.image} 
                  alt="Speaker poster"
                  className="w-full h-auto object-cover"
                  data-testid={`img-speaker-thumbnail-${speaker.id}`}
                />
              </div>
            </ScrollFadeUp>
          ))}
        </div>

        {/* Be a Speaker Section */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <ScrollFadeUp>
            <Card className="bg-red-600 text-white p-8 rounded-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Presentation className="w-6 h-6" />
                    <h3 className="text-2xl sm:text-3xl font-bold">Be a Live Podcast Speaker at KSF Venue</h3>
                  </div>
                </div>
                <Link href="/speaker-register">
                  <Button 
                    variant="default" 
                    className="bg-white text-red-600 hover:bg-gray-100 whitespace-nowrap"
                    data-testid="button-register-speaker"
                  >
                    Register Now
                  </Button>
                </Link>
              </div>
            </Card>
          </ScrollFadeUp>
        </div>
      </div>

      {selectedSpeaker && (
        <SpeakerModal 
          speaker={selectedSpeaker} 
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </div>
  );
}
