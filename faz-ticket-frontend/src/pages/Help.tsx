import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Mail, Phone, MessageCircle, ShieldCheck, CreditCard, Ticket, Clock } from "lucide-react";

const faqCategories = [
  {
    category: "Buying Tickets",
    icon: Ticket,
    faqs: [
      {
        question: "How do I purchase tickets?",
        answer: "Browse available matches, select your preferred seats, add to cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase."
      },
      {
        question: "Can I buy tickets for multiple matches at once?",
        answer: "Yes! You can add tickets from different matches to your cart and complete the purchase in a single transaction."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept MTN MoMo, Airtel Money, Zamtel Money, Visa, and Mastercard. All payments are processed securely through our payment gateway."
      },
      {
        question: "Is there a limit on how many tickets I can buy?",
        answer: "You can purchase up to 6 tickets per match to ensure fair access for all fans."
      }
    ]
  },
  {
    category: "Account & Authentication",
    icon: ShieldCheck,
    faqs: [
      {
        question: "Do I need an account to buy tickets?",
        answer: "Yes, you need to create an account to purchase and manage your tickets. This helps us keep your tickets secure and allows you to access them anytime."
      },
      {
        question: "How do I verify my email?",
        answer: "After registration, we'll send a verification code to your email. Enter this code on the verification page to activate your account."
      },
      {
        question: "I forgot my password. What should I do?",
        answer: "Click 'Forgot Password' on the sign-in page, enter your email, and we'll send you instructions to reset your password."
      },
      {
        question: "Can I change my account details?",
        answer: "Yes, you can update your profile information in your account settings after signing in."
      }
    ]
  },
  {
    category: "Payment & Refunds",
    icon: CreditCard,
    faqs: [
      {
        question: "How long does payment processing take?",
        answer: "Most payments are processed instantly. Mobile money payments may take 1-5 minutes. You'll receive a confirmation email once the payment is successful."
      },
      {
        question: "Can I get a refund if I can't attend?",
        answer: "Refunds are available up to 48 hours before the match starts. After this time, tickets are non-refundable unless the match is canceled or postponed."
      },
      {
        question: "What happens if a match is canceled?",
        answer: "If a match is canceled, you'll receive a full refund automatically within 5-7 business days. We'll also send you an email notification."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes! We use industry-standard encryption and security measures. We never store your full payment details on our servers."
      }
    ]
  },
  {
    category: "Ticket Delivery & Access",
    icon: Clock,
    faqs: [
      {
        question: "How will I receive my tickets?",
        answer: "Tickets are delivered digitally to your account immediately after payment. You can access them in 'My Tickets' section anytime."
      },
      {
        question: "Can I print my tickets?",
        answer: "Yes! You can download a PDF version of your ticket and print it, or simply show the QR code from your mobile device at the stadium."
      },
      {
        question: "What if I lose my ticket?",
        answer: "Don't worry! Your tickets are always available in your account. Just sign in and go to 'My Tickets' to access them again."
      },
      {
        question: "Can I transfer my ticket to someone else?",
        answer: "Ticket transfers are available up to 24 hours before the match. Contact our support team for assistance with ticket transfers."
      }
    ]
  }
];

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    details: "+260 211 251 541",
    description: "Mon-Fri, 8am-6pm",
    action: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Support",
    details: "support@fazetickets.zm",
    description: "Response within 24 hours",
    action: "Send Email"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    details: "Chat with our team",
    description: "Available during match days",
    action: "Start Chat"
  }
];

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-accent py-16 px-4">
          <div className="container mx-auto text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-4 text-primary-foreground" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Help & Support
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
              Find answers to common questions or reach out to our support team
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for help articles..."
                  className="h-14 pl-12 text-lg bg-background/95 backdrop-blur"
                />
                <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="container mx-auto px-4 -mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <method.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold text-lg mb-1">{method.title}</h3>
                  <p className="text-sm font-medium text-foreground mb-1">{method.details}</p>
                  <p className="text-xs text-muted-foreground mb-4">{method.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Browse through common questions and find the answers you need
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-primary" />
                    <span>{category.category}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {category.faqs.length} Questions
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left hover:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="bg-muted py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
              <p className="text-muted-foreground">Quick links to helpful information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <ShieldCheck className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Safety & Security</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn about our security measures
                  </p>
                  <Button variant="link" className="text-primary p-0">
                    Read More →
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Payment Methods</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    View all accepted payment options
                  </p>
                  <Button variant="link" className="text-primary p-0">
                    Read More →
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Ticket className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Ticket Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Step-by-step buying guide
                  </p>
                  <Button variant="link" className="text-primary p-0">
                    Read More →
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Stadium Guide</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    What to expect at the venue
                  </p>
                  <Button variant="link" className="text-primary p-0">
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Still Need Help CTA */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Mail className="h-5 w-5" />
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              Live Chat
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
