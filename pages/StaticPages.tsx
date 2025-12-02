import React from 'react';
import { useParams } from 'react-router-dom';

const Content: Record<string, { title: string; content: React.ReactNode }> = {
  'privacy.html': {
    title: 'Privacy Policy',
    content: (
      <>
        <p>At Unblocked Games 2025, accessible from unblockedgames2025.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Unblocked Games 2025 and how we use it.</p>
        <h3 className="text-xl font-bold mt-4 mb-2">Log Files</h3>
        <p>Unblocked Games 2025 follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp.</p>
        <h3 className="text-xl font-bold mt-4 mb-2">Cookies and Web Beacons</h3>
        <p>Like any other website, Unblocked Games 2025 uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</p>
        <h3 className="text-xl font-bold mt-4 mb-2">Google DoubleClick DART Cookie</h3>
        <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.</p>
      </>
    )
  },
  'about.html': {
    title: 'About Us',
    content: (
      <>
        <p>Unblocked Games 2025 is a leading provider of free online games tailored for environments with restricted internet access, such as schools and offices. Established in 2024, our goal is to ensure fun is accessible to everyone, everywhere.</p>
        <p className="mt-4">Our team of engineers constantly updates our mirror sites and proxies to ensure 99.9% uptime. All games are vetted for safety and quality.</p>
      </>
    )
  },
  'contact.html': {
    title: 'Contact Us',
    content: (
      <>
        <p>If you have any questions, suggestions, or want to report a bug, please contact us.</p>
        <div className="mt-6 bg-gaming-900 p-6 rounded-lg max-w-md">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input type="email" placeholder="your@email.com" className="w-full bg-gaming-800 border border-gaming-700 rounded p-2 mb-4" />
            
            <label className="block text-sm font-bold mb-2">Message</label>
            <textarea className="w-full bg-gaming-800 border border-gaming-700 rounded p-2 mb-4 h-32"></textarea>
            
            <button className="bg-gaming-accent px-6 py-2 rounded font-bold">Send Message</button>
        </div>
      </>
    )
  }
};

const StaticPage: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  // Default to privacy if undefined, or handle 404
  const key = page || 'privacy.html';
  const data = Content[key];

  if (!data) return <div className="p-10 text-center">404 Page Not Found</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-black mb-8 border-b border-gaming-700 pb-4">{data.title}</h1>
      <div className="text-gray-300 leading-relaxed space-y-4">
        {data.content}
      </div>
    </div>
  );
};

export default StaticPage;