import { ArrowLeft, X } from "lucide-react";
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
    name: "Ajil Muhammed",
    title: "CEO",
    company: "HiLite Group",
    image: ajilImage,
  },
  {
    id: 2,
    name: "Mohammed Alfan",
    title: "Founder",
    company: "Rows & Columns",
    image: alfanImage,
  },
  {
    id: 3,
    name: "Jaizal Ali",
    title: "Founder",
    company: "RedTeam Hacker Academy",
    image: jaizalImage,
  },
  {
    id: 4,
    name: "Jishnu P V",
    title: "Founder & CEO",
    company: "Elance",
    image: jishnuImage,
  },
  {
    id: 5,
    name: "Naseef Neeruttichali",
    title: "Founder & CEO",
    company: "Flavors of Kerala",
    image: naseefImage,
  },
  {
    id: 6,
    name: "Noureen Aysha",
    title: "Co-founder",
    company: "FemiSafe",
    image: noureenImage,
  },
  {
    id: 7,
    name: "Rameez Moidu",
    title: "Executive Director",
    company: "KRS",
    image: rameezImage,
  },
  {
    id: 8,
    name: "Rayhan Abdul Rahiman",
    title: "CEO",
    company: "Make Your Own Perfume (MYOP)",
    image: rayhanImage,
  },
  {
    id: 9,
    name: "Shahad Moideen",
    title: "CEO & Executive Director",
    company: "Kenza TMIT",
    image: shahadImage,
  },
  {
    id: 10,
    name: "Thajudeen Aboobaker",
    title: "Founder & CEO",
    company: "Urban Trash",
    image: thajudeenImage,
  },
  {
    id: 11,
    name: "Umer Abdussalam",
    title: "CEO",
    company: "EdApt",
    image: umerImage,
  },
  {
    id: 12,
    name: "V A Shrikumar",
    title: "Film Maker",
    company: "Ad Film Director",
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
          alt={speaker.name}
          className="w-full h-auto object-cover"
          data-testid={`img-speaker-${speaker.id}`}
        />
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{speaker.name}</h2>
          <p className="text-lg text-gray-600 mb-1">{speaker.title}</p>
          <p className="text-gray-500">{speaker.company}</p>
        </div>
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
              <Card 
                className="overflow-hidden cursor-pointer hover-elevate transition-all h-full" 
                onClick={() => setSelectedSpeaker(speaker)}
                data-testid={`card-speaker-${speaker.id}`}
              >
                <div className="aspect-video overflow-hidden bg-gray-200">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                    data-testid={`img-speaker-thumbnail-${speaker.id}`}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2" data-testid={`text-speaker-name-${speaker.id}`}>{speaker.name}</h3>
                  <p className="text-sm text-gray-600 mb-1" data-testid={`text-speaker-title-${speaker.id}`}>{speaker.title}</p>
                  <p className="text-sm text-gray-500" data-testid={`text-speaker-company-${speaker.id}`}>{speaker.company}</p>
                </div>
              </Card>
            </ScrollFadeUp>
          ))}
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
