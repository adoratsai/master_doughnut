"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCustomization } from "@/components/product-customization"

const products = [
  {
    id: "1",
    name: "經典原味甜甜圈",
    description: "使用頂級麵粉與天然奶油，口感鬆軟綿密",
    price: 80,
    image: "/classic-glazed-doughnut.jpg",
    category: "經典系列",
  },
  {
    id: "2",
    name: "巧克力熔岩甜甜圈",
    description: "濃郁比利時巧克力內餡，每一口都是驚喜",
    price: 95,
    image: "/chocolate-lava-doughnut.jpg",
    category: "經典系列",
  },
  {
    id: "3",
    name: "抹茶紅豆甜甜圈",
    description: "京都宇治抹茶搭配北海道紅豆，和風經典",
    price: 90,
    image: "/matcha-red-bean-doughnut.jpg",
    category: "經典系列",
  },
  {
    id: "4",
    name: "草莓奶油甜甜圈",
    description: "新鮮草莓搭配香濃鮮奶油，酸甜平衡",
    price: 85,
    image: "/strawberry-cream-doughnut.jpg",
    category: "水果系列",
  },
  {
    id: "5",
    name: "芒果椰奶甜甜圈",
    description: "熱帶風情芒果與椰奶的完美結合",
    price: 90,
    image: "/mango-coconut-doughnut.jpg",
    category: "水果系列",
  },
  {
    id: "6",
    name: "焦糖海鹽甜甜圈",
    description: "甜鹹交織的極致享受，法式焦糖工藝",
    price: 95,
    image: "/salted-caramel-doughnut.jpg",
    category: "特色系列",
  },
  {
    id: "7",
    name: "伯爵茶甜甜圈",
    description: "英式伯爵茶香氣，優雅細緻口感",
    price: 85,
    image: "/earl-grey-tea-doughnut.jpg",
    category: "特色系列",
  },
  {
    id: "8",
    name: "開心果玫瑰甜甜圈",
    description: "西西里開心果與大馬士革玫瑰的浪漫邂逅",
    price: 100,
    image: "/pistachio-rose-doughnut.jpg",
    category: "特色系列",
  },
]

const categories = ["全部", "經典系列", "水果系列", "特色系列"]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

  const filteredProducts =
    selectedCategory === "全部" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl text-center text-foreground mb-4 text-balance">精選菜單</h1>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          每一款甜甜圈都經過精心設計，使用最優質的食材製作
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-border text-foreground hover:bg-secondary"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden border-border hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-5">
                <div className="text-xs text-primary mb-2">{product.category}</div>
                <h3 className="text-lg font-medium text-foreground mb-2 text-balance">{product.name}</h3>
                <p className="text-sm text-foreground/70 mb-4 leading-relaxed line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-primary font-medium">NT$ {product.price}</p>
                  <Button
                    size="sm"
                    onClick={() => setSelectedProduct(product)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    客製化
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Customization Modal */}
      {selectedProduct && <ProductCustomization product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </main>
  )
}
