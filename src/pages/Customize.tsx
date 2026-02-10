import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Ruler,
  Palette,
  Shirt,
  Upload,
  User,
  ChevronRight,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const clothingTypes = [
  { id: "tshirt", name: "T-Shirt", icon: "👕" },
  { id: "hoodie", name: "Hoodie", icon: "🧥" },
  { id: "jacket", name: "Jacket", icon: "🧥" },
  { id: "pants", name: "Pants", icon: "👖" },
  { id: "shorts", name: "Shorts", icon: "🩳" },
];

const fabrics = [
  { id: "cotton", name: "Premium Cotton", description: "Soft & breathable" },
  { id: "organic", name: "Organic Cotton", description: "Eco-friendly choice" },
  { id: "blend", name: "Cotton-Poly Blend", description: "Durable & easy care" },
  { id: "fleece", name: "French Terry", description: "Warm & cozy" },
];

const colors = [
  { id: "black", name: "Black", hex: "#1a1a1a" },
  { id: "white", name: "White", hex: "#ffffff" },
  { id: "navy", name: "Navy", hex: "#1e3a5f" },
  { id: "gray", name: "Gray", hex: "#6b7280" },
  { id: "burgundy", name: "Burgundy", hex: "#722f37" },
  { id: "olive", name: "Olive", hex: "#556b2f" },
  { id: "beige", name: "Beige", hex: "#d4c4a8" },
  { id: "cyan", name: "Cyan", hex: "#00b8d4" },
];

export default function Customize() {
  const [selectedType, setSelectedType] = useState("tshirt");
  const [selectedFabric, setSelectedFabric] = useState("cotton");
  const [selectedColor, setSelectedColor] = useState("black");
  const [gender, setGender] = useState("male");
  const [measurements, setMeasurements] = useState({
    height: 170,
    chest: 100,
    waist: 85,
    shoulders: 45,
    sleeve: 60,
  });

  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="zeromade-hero-gradient py-16 text-primary-foreground">
          <div className="zeromade-container">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4" />
                AI Design Studio
              </div>
              <h1 className="mb-4 font-display text-3xl font-bold lg:text-4xl">
                Create Your Custom Outfit
              </h1>
              <p className="text-primary-foreground/70">
                Design clothing that fits your body perfectly using our
                AI-powered customization engine.
              </p>
            </div>
          </div>
        </section>

        {/* Customizer */}
        <section className="py-12">
          <div className="zeromade-container">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left: Options */}
              <div className="lg:col-span-2 space-y-8">
                <Tabs defaultValue="type" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="type" className="gap-2">
                      <Shirt className="h-4 w-4" />
                      <span className="hidden sm:inline">Type</span>
                    </TabsTrigger>
                    <TabsTrigger value="measurements" className="gap-2">
                      <Ruler className="h-4 w-4" />
                      <span className="hidden sm:inline">Fit</span>
                    </TabsTrigger>
                    <TabsTrigger value="design" className="gap-2">
                      <Palette className="h-4 w-4" />
                      <span className="hidden sm:inline">Design</span>
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="gap-2">
                      <Upload className="h-4 w-4" />
                      <span className="hidden sm:inline">Upload</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Type Selection */}
                  <TabsContent value="type" className="space-y-6">
                    <div>
                      <h3 className="mb-4 font-display text-lg font-semibold">
                        Choose Clothing Type
                      </h3>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                        {clothingTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedType(type.id)}
                            className={`rounded-xl border-2 p-4 text-center transition-all ${
                              selectedType === type.id
                                ? "border-accent bg-accent/5"
                                : "border-border hover:border-accent/50"
                            }`}
                          >
                            <span className="text-3xl">{type.icon}</span>
                            <p className="mt-2 text-sm font-medium">
                              {type.name}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 font-display text-lg font-semibold">
                        Select Fabric
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {fabrics.map((fabric) => (
                          <button
                            key={fabric.id}
                            onClick={() => setSelectedFabric(fabric.id)}
                            className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                              selectedFabric === fabric.id
                                ? "border-accent bg-accent/5"
                                : "border-border hover:border-accent/50"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                selectedFabric === fabric.id
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-secondary"
                              }`}
                            >
                              {selectedFabric === fabric.id ? (
                                <Check className="h-5 w-5" />
                              ) : null}
                            </div>
                            <div>
                              <p className="font-medium">{fabric.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {fabric.description}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Measurements */}
                  <TabsContent value="measurements" className="space-y-6">
                    <div>
                      <h3 className="mb-4 font-display text-lg font-semibold">
                        Body Measurements
                      </h3>

                      <div className="mb-6">
                        <Label className="mb-2 block">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className="w-full sm:w-48">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="unisex">Unisex</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                          <Label className="mb-2 block">
                            Height: {measurements.height} cm
                          </Label>
                          <Slider
                            value={[measurements.height]}
                            onValueChange={([v]) =>
                              setMeasurements({ ...measurements, height: v })
                            }
                            min={140}
                            max={200}
                            step={1}
                            className="py-2"
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block">
                            Chest: {measurements.chest} cm
                          </Label>
                          <Slider
                            value={[measurements.chest]}
                            onValueChange={([v]) =>
                              setMeasurements({ ...measurements, chest: v })
                            }
                            min={70}
                            max={140}
                            step={1}
                            className="py-2"
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block">
                            Waist: {measurements.waist} cm
                          </Label>
                          <Slider
                            value={[measurements.waist]}
                            onValueChange={([v]) =>
                              setMeasurements({ ...measurements, waist: v })
                            }
                            min={60}
                            max={120}
                            step={1}
                            className="py-2"
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block">
                            Shoulders: {measurements.shoulders} cm
                          </Label>
                          <Slider
                            value={[measurements.shoulders]}
                            onValueChange={([v]) =>
                              setMeasurements({ ...measurements, shoulders: v })
                            }
                            min={35}
                            max={60}
                            step={1}
                            className="py-2"
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block">
                            Sleeve Length: {measurements.sleeve} cm
                          </Label>
                          <Slider
                            value={[measurements.sleeve]}
                            onValueChange={([v]) =>
                              setMeasurements({ ...measurements, sleeve: v })
                            }
                            min={40}
                            max={80}
                            step={1}
                            className="py-2"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Design */}
                  <TabsContent value="design" className="space-y-6">
                    <div>
                      <h3 className="mb-4 font-display text-lg font-semibold">
                        Choose Color
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {colors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => setSelectedColor(color.id)}
                            className={`group relative h-12 w-12 rounded-full border-2 transition-all ${
                              selectedColor === color.id
                                ? "border-accent scale-110"
                                : "border-transparent hover:scale-105"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          >
                            {selectedColor === color.id && (
                              <Check
                                className={`absolute inset-0 m-auto h-5 w-5 ${
                                  color.id === "white" || color.id === "beige"
                                    ? "text-primary"
                                    : "text-primary-foreground"
                                }`}
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 font-display text-lg font-semibold">
                        Add Text (Optional)
                      </h3>
                      <input
                        type="text"
                        placeholder="Enter text to print on clothing..."
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 transition-colors focus:border-accent focus:outline-none"
                      />
                    </div>
                  </TabsContent>

                  {/* Upload */}
                  <TabsContent value="upload" className="space-y-6">
                    <div>
                      <h3 className="mb-4 font-display text-lg font-semibold">
                        Upload Your Design
                      </h3>
                      <div className="rounded-xl border-2 border-dashed border-border p-12 text-center transition-colors hover:border-accent/50">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 font-medium">
                          Drag & drop your design here
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          or click to browse files
                        </p>
                        <Button variant="outline" className="mt-4">
                          Choose File
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-4 font-display text-lg font-semibold">
                        AI Avatar (Coming Soon)
                      </h3>
                      <div className="rounded-xl bg-secondary/50 p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                            <User className="h-8 w-8 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Create Your AI Avatar
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Upload your photo and see how clothes look on you
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right: Preview */}
              <div className="lg:sticky lg:top-24">
                <div className="rounded-2xl border bg-card p-6">
                  <h3 className="mb-4 font-display text-lg font-semibold">
                    Preview
                  </h3>

                  {/* Preview Area */}
                  <div
                    className="mb-6 aspect-square rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor:
                        colors.find((c) => c.id === selectedColor)?.hex ||
                        "#1a1a1a",
                    }}
                  >
                    <span className="text-8xl">
                      {
                        clothingTypes.find((t) => t.id === selectedType)
                          ?.icon
                      }
                    </span>
                  </div>

                  {/* Summary */}
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium">
                        {
                          clothingTypes.find((t) => t.id === selectedType)
                            ?.name
                        }
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fabric</span>
                      <span className="font-medium">
                        {fabrics.find((f) => f.id === selectedFabric)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Color</span>
                      <span className="font-medium">
                        {colors.find((c) => c.id === selectedColor)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Price</span>
                      <span className="font-medium">₹1,999</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="font-medium">Total</span>
                      <span className="font-display text-xl font-bold text-accent">
                        ₹1,999
                      </span>
                    </div>
                  </div>

                  <Button
                    className="mt-6 w-full btn-hero"
                    onClick={() =>
                      addItem({
                        id: `custom-${Date.now()}`,
                        name: "Custom Zeromade Outfit",
                        price: 1999,
                        image: "",
                        color: colors.find((c) => c.id === selectedColor)?.name,
                        size: gender === "female" ? "Women's Fit" : "Unisex",
                      })
                    }
                  >
                    Add to Cart
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}