import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const featuredProducts = [
  {
    id: "1",
    name: "經典原味甜甜圈",
    description: "使用頂級麵粉與天然奶油，口感鬆軟綿密",
    price: 80,
    image: "/classic-glazed-doughnut.jpg",
  },
  {
    id: "2",
    name: "巧克力熔岩甜甜圈",
    description: "濃郁比利時巧克力內餡，每一口都是驚喜",
    price: 95,
    image: "/chocolate-lava-doughnut.jpg",
  },
  {
    id: "3",
    name: "抹茶紅豆甜甜圈",
    description: "京都宇治抹茶搭配北海道紅豆，和風經典",
    price: 90,
    image: "/matcha-red-bean-doughnut.jpg",
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-secondary py-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-6xl md:text-8xl text-primary mb-6 text-balance">MASTER DOUGHNUT</h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            精緻手工甜甜圈，每一口都是藝術品
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/menu">探索菜單</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl text-center text-foreground mb-12 text-balance">主打商品</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden border-border hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-medium text-foreground mb-2">{product.name}</h3>
                  <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{product.description}</p>
                  <p className="text-2xl text-primary font-medium mb-4">NT$ {product.price}</p>
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href={`/menu?product=${product.id}`}>立即訂購</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl text-foreground mb-6 text-balance">關於我們</h2>
          <p className="text-foreground/80 leading-relaxed text-lg">
            MASTER DOUGHNUT 堅持使用最優質的食材，每一個甜甜圈都由經驗豐富的師傅手工製作。
            我們相信，美味不僅來自於食材，更來自於對細節的堅持與對品質的追求。
          </p>
        </div>
      </section>
    </main>
  )
}
