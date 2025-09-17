"use client";
import React, { useState } from 'react';
import styles from "./layout.module.css";
import { LuChevronRight, LuChevronDown, LuFile, LuFolder, LuFolderOpen } from 'react-icons/lu';

const FileTree = () => {
  const [fileStructure] = useState({
    name: 'my-project',
    type: 'folder',
    children: [
      {
        name: 'src',
        type: 'folder',
        children: [
          {
            name: 'components',
            type: 'folder',
            children: [
              { name: 'Header.jsx', type: 'file', extension: 'jsx' },
              { name: 'Footer.jsx', type: 'file', extension: 'jsx' },
              { name: 'Button.jsx', type: 'file', extension: 'jsx' }
            ]
          },
          {
            name: 'hooks',
            type: 'folder',
            children: [
              { name: 'useAuth.js', type: 'file', extension: 'js' },
              { name: 'useLocalStorage.js', type: 'file', extension: 'js' }
            ]
          },
          {
            name: 'utils',
            type: 'folder',
            children: [
              { name: 'helpers.js', type: 'file', extension: 'js' },
              { name: 'constants.js', type: 'file', extension: 'js' }
            ]
          },
          { name: 'App.jsx', type: 'file', extension: 'jsx' },
          { name: 'index.js', type: 'file', extension: 'js' },
          { name: 'index.css', type: 'file', extension: 'css' }
        ]
      },
      {
        name: 'public',
        type: 'folder',
        children: [
          { name: 'index.html', type: 'file', extension: 'html' },
          { name: 'favicon.ico', type: 'file', extension: 'ico' }
        ]
      },
      { name: 'package.json', type: 'file', extension: 'json' },
      { name: 'README.md', type: 'file', extension: 'md' },
      { name: '.gitignore', type: 'file', extension: 'gitignore' }
    ]
  });

  const [expandedFolders, setExpandedFolders] = useState(new Set(['my-project', 'src']));
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const selectFile = (path) => {
    setSelectedFile(path);
  };

  const getFileIcon = (extension) => {
    const iconMap = {
      jsx: '/react-original.svg',
      js: '/javascript-original.svg',
      css: '/css3-original.svg',
      html: '/html5-original.svg',
      json: '/json-original.svg',
      md: '/markdown-original.svg',
      gitignore: '/git-original.svg'
    };
    return iconMap[extension] || '/file.svg';
  };

  const FileTreeNode = ({ node, path = '', depth = 0 }) => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedFolders.has(currentPath);
    const isSelected = selectedFile === currentPath;

    if (node.type === 'folder') {
      return (
        <div>
          <div
            className={`${styles.treeNode} ${styles.folderNode} ${isSelected ? 'selected' : ''}`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
            onClick={() => toggleFolder(currentPath)}
          >
            <div className={styles.nodeContent}>
              {isExpanded ? (
                <LuChevronDown size={16} className={`${styles.chevronIcon}`}/>
              ) : (
                <LuChevronRight size={16} className={`${styles.chevronIcon}`}/>
              )}
              {isExpanded ? (
                <LuFolderOpen size={16} className={`${styles.folderIcon}`}/>
              ) : (
                <LuFolder size={16} className={`${styles.folderIcon}`}/>
              )}
              <span className={`${styles.nodeName} ${styles.folderName}`}>
                {node.name}
              </span>
            </div>
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map((child, index) => (
                <FileTreeNode
                  key={`${currentPath}/${child.name}`}
                  node={child}
                  path={currentPath}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className={`${styles.treeNode} ${styles.fileNode} ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: `${depth * 16 + 24}px` }}
        onClick={() => selectFile(currentPath)}
      >
        <div className={styles.nodeContent}>
          <img 
            src={getFileIcon(node.extension)} 
            alt={`${node.extension} icon`}
            className={styles.fileIcon}
          />
          <span className={`${styles.nodeName} ${styles.fileName}`}>
            {node.name}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`${styles.fileTreeContainer}`}>
      <div className={`${styles.fileTreeContent}`}>
        <FileTreeNode node={fileStructure} />
      </div>
      
      {/* Status bar showing selected file */}
      {selectedFile && (
        <div className={`${styles.statusBar}`}>
          Selected: {selectedFile}
        </div>
      )}
    </div>
  );
};

export default FileTree;