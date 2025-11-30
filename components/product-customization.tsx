"use client"

import { useState } from "react"
import { X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

interface ProductCustomizationProps {
  product: Product
  onClose: () => void
}

const flavorOptions = [
  { id: "original", label: "原味", price: 0 },
  { id: "chocolate", label: "巧克力", price: 10 },
  { id: "matcha", label: "抹茶", price: 10 },
  { id: "strawberry", label: "草莓", price: 10 },
]

const sweetnessOptions = [
  { id: "normal", label: "正常甜度" },
  { id: "less", label: "少糖" },
  { id: "half", label: "半糖" },
  { id: "light", label: "微糖" },
]

const toppingOptions = [
  { id: "sprinkles", label: "彩色糖珠", price: 15 },
  { id: "nuts", label: "堅果碎", price: 20 },
  { id: "chocolate-chips", label: "巧克力碎片", price: 15 },
  { id: "coconut", label: "椰子絲", price: 15 },
  { id: "caramel", label: "焦糖醬", price: 20 },
]

export function ProductCustomization({ product, onClose }: ProductCustomizationProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedFlavor, setSelectedFlavor] = useState(flavorOptions[0].id)
  const [selectedSweetness, setSelectedSweetness] = useState(sweetnessOptions[0].id)
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()

  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId) ? prev.filter((id) => id !== toppingId) : [...prev, toppingId],
    )
  }

  const calculateTotal = () => {
    const flavorPrice = flavorOptions.find((f) => f.id === selectedFlavor)?.price || 0
    const toppingsPrice = selectedToppings.reduce((sum, toppingId) => {
      const topping = toppingOptions.find((t) => t.id === toppingId)
      return sum + (topping?.price || 0)
    }, 0)
    return (product.price + flavorPrice + toppingsPrice) * quantity
  }

  const handleAddToCart = () => {
    const flavor = flavorOptions.find((f) => f.id === selectedFlavor)?.label
    const sweetness = sweetnessOptions.find((s) => s.id === selectedSweetness)?.label
    const toppings = selectedToppings.map((id) => toppingOptions.find((t) => t.id === id)?.label).filter(Boolean)

    addItem({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: calculateTotal() / quantity,
      quantity,
      customization: {
        flavor,
        sweetness,
        toppings: toppings as string[],
      },
    })

    toast({
      title: "已加入購物車",
      description: `${product.name} x ${quantity}`,
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-foreground">客製化您的甜甜圈</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Product Info */}
          <div className="flex gap-4">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-24 h-24 rounded-lg object-cover bg-muted"
            />
            <div>
              <h3 className="text-xl font-medium text-foreground mb-1">{product.name}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">{product.description}</p>
              <p className="text-lg text-primary font-medium mt-2">基礎價格: NT$ {product.price}</p>
            </div>
          </div>

          {/* Flavor Selection */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">選擇口味</h4>
            <div className="grid grid-cols-2 gap-3">
              {flavorOptions.map((flavor) => (
                <button
                  key={flavor.id}
                  onClick={() => setSelectedFlavor(flavor.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedFlavor === flavor.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium text-foreground">{flavor.label}</div>
                  {flavor.price > 0 && <div className="text-sm text-foreground/70">+NT$ {flavor.price}</div>}
                </button>
              ))}
            </div>
          </div>

          {/* Sweetness Selection */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">甜度選擇</h4>
            <div className="grid grid-cols-2 gap-3">
              {sweetnessOptions.map((sweetness) => (
                <button
                  key={sweetness.id}
                  onClick={() => setSelectedSweetness(sweetness.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedSweetness === sweetness.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium text-foreground">{sweetness.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Toppings Selection */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">加料選擇（可多選）</h4>
            <div className="grid grid-cols-2 gap-3">
              {toppingOptions.map((topping) => (
                <button
                  key={topping.id}
                  onClick={() => toggleTopping(topping.id)}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    selectedToppings.includes(topping.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium text-foreground">{topping.label}</div>
                  <div className="text-sm text-foreground/70">+NT$ {topping.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <h4 className="text-lg font-medium text-foreground mb-3">數量</h4>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-2xl font-medium text-foreground w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg text-foreground">總計</span>
            <span className="text-2xl font-medium text-primary">NT$ {calculateTotal()}</span>
          </div>
          <Button onClick={handleAddToCart} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            加入購物車
          </Button>
        </div>
      </Card>
    </div>
  )
}
