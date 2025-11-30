"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (items.length === 0) {
      toast({
        title: "購物車是空的",
        description: "請先添加商品到購物車",
        variant: "destructive",
      })
      return
    }

    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: "請填寫必填欄位",
        description: "姓名、電話和地址為必填項目",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "訂單已送出",
      description: "我們會盡快處理您的訂單，感謝您的購買！",
    })

    clearCart()
    setIsSubmitting(false)
    router.push("/")
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl text-foreground mb-6">購物車</h1>
          <Card className="border-border">
            <CardContent className="py-16">
              <p className="text-foreground/70 text-lg mb-6">您的購物車目前是空的</p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="/menu">前往菜單</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl text-center text-foreground mb-12">結帳</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">購物車明細</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">{item.name}</h3>
                      {item.customization && (
                        <div className="text-sm text-foreground/70 space-y-1">
                          {item.customization.flavor && <div>口味: {item.customization.flavor}</div>}
                          {item.customization.sweetness && <div>甜度: {item.customization.sweetness}</div>}
                          {item.customization.toppings && item.customization.toppings.length > 0 && (
                            <div>加料: {item.customization.toppings.join(", ")}</div>
                          )}
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-foreground font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium text-primary mb-2">NT$ {item.price * item.quantity}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Checkout Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">配送資訊</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        姓名 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="請輸入您的姓名"
                        required
                        className="border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground">
                        電話 <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="請輸入您的電話"
                        required
                        className="border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      電子郵件
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="請輸入您的電子郵件"
                      className="border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-foreground">
                      配送地址 <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="請輸入完整的配送地址"
                      required
                      rows={3}
                      className="border-border resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-foreground">
                      訂單備註
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="有任何特殊需求嗎？"
                      rows={3}
                      className="border-border resize-none"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border sticky top-20">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">訂單摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-foreground/70">
                    <span>小計</span>
                    <span>NT$ {total}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>運費</span>
                    <span>NT$ 60</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between text-lg font-medium text-foreground">
                    <span>總計</span>
                    <span className="text-primary">NT$ {total + 60}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "處理中..." : "確認訂單"}
                </Button>

                <div className="text-xs text-foreground/60 text-center leading-relaxed">
                  點擊「確認訂單」即表示您同意我們的服務條款與隱私政策
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
