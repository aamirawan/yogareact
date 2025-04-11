import React from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';

const { Panel } = Collapse;

const faqs = [
  {
    question: "How do online yoga classes work?",
    answer: "Our online yoga classes are conducted live through a secure video platform. You'll need a stable internet connection, a device with a camera (computer, tablet, or smartphone), and enough space to practice. Once you book a class, you'll receive a link to join the session."
  },
  {
    question: "What equipment do I need?",
    answer: "You'll need a yoga mat, comfortable clothing, and optionally some props like blocks or straps. Most poses can be modified if you don't have props. We'll provide a detailed list of recommended equipment before your first class."
  },
  {
    question: "Are the classes suitable for beginners?",
    answer: "Yes! We offer classes for all levels, from complete beginners to advanced practitioners. Our teachers are experienced in providing modifications and alternatives for different skill levels."
  },
  {
    question: "How long are the classes?",
    answer: "Most of our classes are 60 minutes long, though we also offer 30-minute and 90-minute sessions. The duration is always clearly indicated in the class description."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes, we offer a 100% satisfaction guarantee. If you're not happy with your first class, we'll give you a full refund or a free class with a different teacher."
  },
  {
    question: "How do I book a private session?",
    answer: "You can book a private session through our booking page. Select 'One-on-One Session' and choose your preferred teacher and time slot. We'll confirm your booking within 24 hours."
  }
];

const FAQs = () => {
  const collapseItems = faqs.map((faq, index) => ({
    key: index.toString(),
    label: faq.question,
    children: <p className="text-gray-700">{faq.answer}</p>
  }));

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        <div className="max-w-3xl mx-auto">
          <Collapse defaultActiveKey={['0']} items={collapseItems} />
        </div>
      </div>
    </div>
  );
};

export default FAQs; 