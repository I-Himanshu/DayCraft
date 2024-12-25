import React, { useState, useEffect } from 'react';

const DailyQuote = () => {
  // Array to store quotes - will be filled by user
  const quotes = [
    "You have the right to work, but never to its fruits",
    "Do your duty without expecting the rewards",
    "Action is better than inaction; perform your duties without attachment",
    "Work done with anxiety about results is far inferior to work done with a balanced mind",
    "The wise work for the welfare of the world, without thought for themselves",
    "The mind is everything. What you think, you become",
    "For those who have conquered the mind, it is their friend. For those who have failed to control it, the mind works like an enemy",
    "As a flame does not flicker in a windless place, so does the disciplined mind remain steady",
    "The mind acts like an enemy for those who do not control it",
    "One who has control over the mind is tranquil in heat and cold, joy and grief",
    "Do your duty without attachment to success or failure",
    "It is better to live your own destiny imperfectly than to live an imitation of somebody else's life with perfection",
    "The soul is neither born, nor does it die",
    "Perform your obligatory duty, because action is better than inaction",
    "No one who does good work will ever come to a bad end",
    "Knowledge is better than blind practice, meditation is better than knowledge",
    "The wise see that there is action in inaction and inaction in action",
    "When meditation is mastered, the mind is unwavering like a lamp in a windless place",
    "Knowledge conquered, all else is conquered",
    "Even the wise are confused about what is action and what is inaction",
    "You are what you believe in. You become that which you believe you can become",
    "Change is the law of the universe. What you resist persists, what you accept transforms",
    "The self is the friend of a person who has conquered himself through the self",
    "Through discipline comes happiness",
    "Whatever happened, happened for good. Whatever is happening, is happening for good",
    "Calmness, gentleness, silence, self-restraint, and purity are disciplines of the mind",
    "Neither agitated by grief nor hankering after pleasure, they live free from lust and fear and anger",
    "From passion comes confusion of mind, then loss of memory, then loss of reason",
    "The power of God is with you at all times; through the activities of mind, senses, breathing, and emotions",
    "Face the pain, accept the pain, but do not be paralyzed by it",
    "Whatever action a great person performs, common people follow",
    "In tranquility, lose the ego; then work like a master",
    "Success in work comes quickly to those who work with enthusiasm",
    "The one whose happiness is within, who is active within, who rejoices within and is illumined within",
    "Those who eat too much or eat too little, sleep too much or sleep too little, cannot succeed in meditation",
    "Peace comes from within. Do not seek it without",
    "The happiness that comes from deep inside is the true happiness",
    "One who sees all beings in himself and himself in all beings loses all fear",
    "When a person responds to the joys and sorrows of others as if they were his own, he is deemed a supreme yogi",
    "One who is not disturbed by happiness and distress and is steady in both is eligible for liberation",
    "As the blazing fire reduces wood to ashes, similarly, the fire of knowledge reduces all reactions to material activities to ashes",
    "The soul which is eternal cannot be slain",
    "That which seems like poison at first, but tastes like nectar in the end - that is the joy of sattva",
    "There is neither this world, nor the world beyond, nor happiness for the one who doubts",
    "Just as a reservoir is of little use when the whole area is flooded, scriptures are of little use to the illumined person",
    "Better to live your own path imperfectly than to live another's perfectly",
    "The person whose mind is always free from attachment, who has subdued the mind and senses, obtains true peace",
    "Life is a pilgrimage. The wise man does not rest by the roadside inns",
    "Set your heart upon your work but never its reward",
    "The true goal of action is knowledge of self"
  ];

  const [currentQuote, setCurrentQuote] = useState(null);

  // Function to get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  // Set initial quote on component mount
  useEffect(() => {
    getRandomQuote();
  }, []);

  // Get current date
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(today);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-lg p-8 mb-6 transition-transform transform hover:scale-105">
    <div className="flex justify-center mb-4">
        <span className="text-4xl text-gray-300">“</span>
    </div>
    {currentQuote && (
        <div className="text-center space-y-6">
            <blockquote className="text-3xl text-gray-800 font-bold italic leading-relaxed">
                "{currentQuote}"
            </blockquote>
        </div>
    )}
    <div className="flex justify-center mt-4">
        <span className="text-4xl text-gray-300">”</span>
    </div>
</div>


  );
};

export default DailyQuote;