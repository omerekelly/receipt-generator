import React from 'react';
import { Github } from 'lucide-react';

interface GithubLinkProps {
  url?: string;
}

const GITHUB_REPO_URL = 'https://github.com/FatDoge/receipt-generator'

const GithubLink: React.FC<GithubLinkProps> = ({ url = GITHUB_REPO_URL }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
    >
      <Github className="w-5 h-5" />
    </a>
  );
};

export default GithubLink;