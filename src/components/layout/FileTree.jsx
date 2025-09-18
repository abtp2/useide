"use client";
import React, { useState, useCallback } from 'react';
import styles from "./layout.module.css";
import { 
  LuChevronRight, 
  LuChevronDown, 
  LuFile, 
  LuFolder, 
  LuFolderOpen, 
  LuEllipsisVertical 
} from 'react-icons/lu';

// Move FileTreeNode outside to prevent re-creation
const FileTreeNode = React.memo(({ 
  node, 
  path = '', 
  depth = 0, 
  expandedFolders, 
  selectedFile, 
  onToggleFolder, 
  onSelectFile,
  onAddFile,
  onAddFolder
}) => {
  const currentPath = path ? `${path}/${node.name}` : node.name;
  const isExpanded = expandedFolders.has(currentPath);
  const isSelected = selectedFile === currentPath;
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleFolder = useCallback(() => {
    onToggleFolder(currentPath);
  }, [currentPath, onToggleFolder]);

  const handleSelectFile = useCallback(() => {
    onSelectFile(currentPath);
  }, [currentPath, onSelectFile]);

  const handleAddFile = useCallback((e) => {
    e.stopPropagation();
    const fileName = prompt('Enter file name (with extension):');
    if (fileName) {
      onAddFile(currentPath, fileName);
    }
    setShowMenu(false);
  }, [currentPath, onAddFile]);

  const handleAddFolder = useCallback((e) => {
    e.stopPropagation();
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      onAddFolder(currentPath, folderName);
    }
    setShowMenu(false);
  }, [currentPath, onAddFolder]);

  if (node.type === 'folder') {
    return (
      <div>
        <div
          className={`${styles.treeNode} ${styles.folderNode} ${isSelected ? styles.selected : ''}`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={handleToggleFolder}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <div className={styles.nodeContent}>
            {isExpanded ? (
              <LuChevronDown size={16} className={styles.chevronIcon}/>
            ) : (
              <LuChevronRight size={16} className={styles.chevronIcon}/>
            )}
            {isExpanded ? (
              <LuFolderOpen size={16} className={styles.folderIcon}/>
            ) : (
              <LuFolder size={16} className={styles.folderIcon}/>
            )}
            <span className={`${styles.nodeName} ${styles.folderName}`}>
              {node.name}
            </span>
            {showMenu && (
              <div className={styles.folderActions}>
                <button 
                  onClick={handleAddFile}
                  className={styles.actionBtn}
                  title="Add file"
                >
                  <LuFile size={12} />
                </button>
                <button 
                  onClick={handleAddFolder}
                  className={styles.actionBtn}
                  title="Add folder"
                >
                  <LuFolder size={12} />
                </button>
              </div>
            )}
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
                expandedFolders={expandedFolders}
                selectedFile={selectedFile}
                onToggleFolder={onToggleFolder}
                onSelectFile={onSelectFile}
                onAddFile={onAddFile}
                onAddFolder={onAddFolder}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${styles.treeNode} ${styles.fileNode} ${isSelected ? styles.selected : ''}`}
      style={{ paddingLeft: `${depth * 16 + 24}px` }}
      onClick={handleSelectFile}
    >
      <div className={styles.nodeContent}>
        <LuFile size={16} className={styles.fileIcon} />
        <span className={`${styles.nodeName} ${styles.fileName}`}>
          {node.name}
        </span>
      </div>
    </div>
  );
});

FileTreeNode.displayName = 'FileTreeNode';

const FileTree = () => {
  const [fileStructure, setFileStructure] = useState({
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
  const [showMainMenu, setShowMainMenu] = useState(false);

  const toggleFolder = useCallback((path) => {
    setExpandedFolders(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(path)) {
        newExpanded.delete(path);
      } else {
        newExpanded.add(path);
      }
      return newExpanded;
    });
  }, []);

  const selectFile = useCallback((path) => {
    setSelectedFile(path);
  }, []);

  // Helper function to find and update a node in the tree
  const updateNodeInTree = useCallback((tree, targetPath, updater) => {
    const pathParts = targetPath.split('/');
    
    const traverse = (node, currentParts) => {
      if (currentParts.length === 1) {
        return updater(node);
      }
      
      const [currentPart, ...remainingParts] = currentParts;
      if (node.name === currentPart && node.children) {
        return {
          ...node,
          children: node.children.map(child => traverse(child, remainingParts))
        };
      }
      
      return node;
    };
    
    return traverse(tree, pathParts);
  }, []);

  const addFile = useCallback((folderPath, fileName) => {
    const extension = fileName.split('.').pop() || '';
    const newFile = {
      name: fileName,
      type: 'file',
      extension: extension
    };

    setFileStructure(prev => 
      updateNodeInTree(prev, folderPath, (node) => ({
        ...node,
        children: [...(node.children || []), newFile]
      }))
    );
  }, [updateNodeInTree]);

  const addFolder = useCallback((parentPath, folderName) => {
    const newFolder = {
      name: folderName,
      type: 'folder',
      children: []
    };

    setFileStructure(prev => 
      updateNodeInTree(prev, parentPath, (node) => ({
        ...node,
        children: [...(node.children || []), newFolder]
      }))
    );
  }, [updateNodeInTree]);

  const handleMainAddFile = useCallback(() => {
    const fileName = prompt('Enter file name (with extension):');
    if (fileName) {
      addFile('my-project', fileName);
    }
    setShowMainMenu(false);
  }, [addFile]);

  const handleMainAddFolder = useCallback(() => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      addFolder('my-project', folderName);
    }
    setShowMainMenu(false);
  }, [addFolder]);

  return (
    <div className={styles.fileTreeContainer}>
      <div className={styles.fileTreeHeader}>
        <div className={styles.projectTitle}>
          <LuFolder size={16} />
          <span>{fileStructure.name}</span>
        </div>
        <div 
          className={styles.mainMenu}
          onMouseEnter={() => setShowMainMenu(true)}
          onMouseLeave={() => setShowMainMenu(false)}
        >
          <LuEllipsisVertical size={16} />
          {showMainMenu && (
            <div className={styles.mainMenuDropdown}>
              <button onClick={handleMainAddFile} className={styles.menuItem}>
                <LuFile size={14} />
                Add File
              </button>
              <button onClick={handleMainAddFolder} className={styles.menuItem}>
                <LuFolder size={14} />
                Add Folder
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.fileTreeContent}>
        <FileTreeNode 
          node={fileStructure}
          expandedFolders={expandedFolders}
          selectedFile={selectedFile}
          onToggleFolder={toggleFolder}
          onSelectFile={selectFile}
          onAddFile={addFile}
          onAddFolder={addFolder}
        />
      </div>
      
      {selectedFile && (
        <div className={styles.statusBar}>
          Selected: {selectedFile}
        </div>
      )}
    </div>
  );
};

export default FileTree;