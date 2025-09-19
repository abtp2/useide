"use client";
import React, { useState, useCallback } from 'react';
import styles from "./layout.module.css";
import { 
  LuChevronRight, 
  LuChevronDown, 
  LuFile,
  LuFolder, 
  LuFolderOpen, 
  LuPencil,
  LuTrash
} from 'react-icons/lu';

// File icon mapping based on extension - using image sources
const getFileIcon = (extension) => {
  const iconMap = {
    'jsx': '/react-original.svg',
    'js': '/javascript-original.svg',
    'ts': '/typescript-original.svg',
    'tsx': '/react-original.svg',
    'html': '/html5-original.svg',
    'css': '/css3-original.svg',
    'scss': '/sass-original.svg',
    'json': '/json-original.svg',
    'md': '/markdown-original.svg',
    'txt': '/file-text.svg',
    'py': '/python-original.svg',
    'java': '/java-original.svg',
    'cpp': '/cplusplus-original.svg',
    'c': '/c-original.svg',
    'php': '/php-original.svg',
    'rb': '/ruby-original.svg',
    'go': '/go-original.svg',
    'rs': '/rust-original.svg',
    'vue': '/vue-original.svg',
    'svg': '/file-image.svg',
    'jpg': '/file-image.svg',
    'jpeg': '/file-image.svg',
    'gif': '/file-image.svg',
    'ico': '/file-image.svg',
    'zip': '/file-archive.svg',
    'rar': '/file-archive.svg',
    'tar': '/file-archive.svg',
    'gz': '/file-archive.svg',
    'gitignore': '/git-original.svg',
    'env': '/file-cog.svg',
    'config': '/file-cog.svg',
    'yml': '/yaml-original.svg',
    'yaml': '/yaml-original.svg',
    'xml': '/xml-original.svg'
  };
  
  return iconMap[extension?.toLowerCase()] || '/file.svg';
};

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
  onAddFolder,
  onEditNode,
  onDeleteNode,
  editingNode,
  setEditingNode
}) => {
  const currentPath = path ? `${path}/${node.name}` : node.name;
  const isExpanded = expandedFolders.has(currentPath);
  const isSelected = selectedFile === currentPath;
  const isEditing = editingNode === currentPath;
  const [isHovered, setIsHovered] = useState(false);
  const [editValue, setEditValue] = useState(node.name);

  const handleToggleFolder = useCallback(() => {
    if (!isEditing) {
      onToggleFolder(currentPath);
    }
  }, [currentPath, onToggleFolder, isEditing]);

  const handleSelectFile = useCallback(() => {
    if (!isEditing) {
      onSelectFile(currentPath);
    }
  }, [currentPath, onSelectFile, isEditing]);

  const handleAddFile = useCallback((e) => {
    e.stopPropagation();
    const fileName = prompt('Enter file name (with extension):');
    if (fileName?.trim()) {
      onAddFile(currentPath, fileName.trim());
    }
  }, [currentPath, onAddFile]);

  const handleAddFolder = useCallback((e) => {
    e.stopPropagation();
    const folderName = prompt('Enter folder name:');
    if (folderName?.trim()) {
      onAddFolder(currentPath, folderName.trim());
    }
  }, [currentPath, onAddFolder]);

  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    setEditValue(node.name);
    setEditingNode(currentPath);
  }, [currentPath, node.name, setEditingNode]);

  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    const confirmDelete = confirm(`Are you sure you want to delete "${node.name}"?`);
    if (confirmDelete) {
      onDeleteNode(currentPath);
    }
  }, [currentPath, node.name, onDeleteNode]);

  const handleEditSubmit = useCallback((e) => {
    if (e.key === 'Enter') {
      if (editValue.trim() && editValue.trim() !== node.name) {
        onEditNode(currentPath, editValue.trim());
      }
      setEditingNode(null);
    } else if (e.key === 'Escape') {
      setEditingNode(null);
      setEditValue(node.name);
    }
  }, [editValue, node.name, currentPath, onEditNode, setEditingNode]);

  const handleEditBlur = useCallback(() => {
    if (editValue.trim() && editValue.trim() !== node.name) {
      onEditNode(currentPath, editValue.trim());
    }
    setEditingNode(null);
  }, [editValue, node.name, currentPath, onEditNode, setEditingNode]);

  if (node.type === 'folder') {
    return (
      <div>
        <div
          className={`${styles.treeNode} ${styles.folderNode} ${isSelected ? styles.selected : ''}`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={handleToggleFolder}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
            {isEditing ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleEditSubmit}
                onBlur={handleEditBlur}
                className={styles.editInput}
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className={`${styles.nodeName} ${styles.folderName}`}>
                {node.name}
              </span>
            )}
            {isHovered && !isEditing && (
              <div className={styles.nodeActions}>
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
                <button 
                  onClick={handleEdit}
                  className={styles.actionBtn}
                  title="Edit name"
                >
                  <LuPencil size={12} />
                </button>
                {currentPath !== 'my-project' && (
                  <button 
                    onClick={handleDelete}
                    className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                    title="Delete"
                  >
                    <LuTrash size={12} />
                  </button>
                )}
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
                onEditNode={onEditNode}
                onDeleteNode={onDeleteNode}
                editingNode={editingNode}
                setEditingNode={setEditingNode}
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.nodeContent}>
        <img 
          src={getFileIcon(node.extension)} 
          alt={`${node.extension} file`}
          className={styles.fileIcon}
          width={16}
          height={16}
        />
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleEditSubmit}
            onBlur={handleEditBlur}
            className={styles.editInput}
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className={`${styles.nodeName} ${styles.fileName}`}>
            {node.name}
          </span>
        )}
        {isHovered && !isEditing && (
          <div className={styles.nodeActions}>
            <button 
              onClick={handleEdit}
              className={styles.actionBtn}
              title="Edit name"
            >
              <LuPencil size={12} />
            </button>
            <button 
              onClick={handleDelete}
              className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
              title="Delete"
            >
              <LuTrash size={12} />
            </button>
          </div>
        )}
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

  const [expandedFolders, setExpandedFolders] = useState(new Set(['my-project', 'my-project/src']));
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingNode, setEditingNode] = useState(null);

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
    
    const traverse = (node, currentParts, parentPath = '') => {
      const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;
      
      if (currentPath === targetPath) {
        return updater(node);
      }
      
      if (node.children && targetPath.startsWith(currentPath)) {
        return {
          ...node,
          children: node.children.map(child => traverse(child, currentParts, currentPath))
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
        children: [...(node.children || []), newFile].sort((a, b) => {
          if (a.type !== b.type) {
            return a.type === 'folder' ? -1 : 1;
          }
          return a.name.localeCompare(b.name);
        })
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
        children: [...(node.children || []), newFolder].sort((a, b) => {
          if (a.type !== b.type) {
            return a.type === 'folder' ? -1 : 1;
          }
          return a.name.localeCompare(b.name);
        })
      }))
    );
  }, [updateNodeInTree]);

  const editNode = useCallback((nodePath, newName) => {
    setFileStructure(prev => 
      updateNodeInTree(prev, nodePath, (node) => ({
        ...node,
        name: newName,
        extension: node.type === 'file' ? newName.split('.').pop() || '' : undefined
      }))
    );

    // Update selected file path if it was the edited node
    if (selectedFile === nodePath) {
      const pathParts = nodePath.split('/');
      pathParts[pathParts.length - 1] = newName;
      setSelectedFile(pathParts.join('/'));
    }

    // Update expanded folders if it was a folder that was renamed
    setExpandedFolders(prev => {
      const newExpanded = new Set();
      prev.forEach(path => {
        if (path === nodePath) {
          const pathParts = path.split('/');
          pathParts[pathParts.length - 1] = newName;
          newExpanded.add(pathParts.join('/'));
        } else if (path.startsWith(nodePath + '/')) {
          const pathParts = nodePath.split('/');
          pathParts[pathParts.length - 1] = newName;
          const newBasePath = pathParts.join('/');
          const remainingPath = path.substring(nodePath.length);
          newExpanded.add(newBasePath + remainingPath);
        } else {
          newExpanded.add(path);
        }
      });
      return newExpanded;
    });
  }, [updateNodeInTree, selectedFile]);

  const deleteNode = useCallback((nodePath) => {
    const pathParts = nodePath.split('/');
    const parentPath = pathParts.slice(0, -1).join('/');
    const nodeToDelete = pathParts[pathParts.length - 1];

    setFileStructure(prev => 
      updateNodeInTree(prev, parentPath, (node) => ({
        ...node,
        children: (node.children || []).filter(child => child.name !== nodeToDelete)
      }))
    );

    // Clear selection if deleted node was selected
    if (selectedFile === nodePath || selectedFile?.startsWith(nodePath + '/')) {
      setSelectedFile(null);
    }

    // Remove from expanded folders
    setExpandedFolders(prev => {
      const newExpanded = new Set();
      prev.forEach(path => {
        if (path !== nodePath && !path.startsWith(nodePath + '/')) {
          newExpanded.add(path);
        }
      });
      return newExpanded;
    });
  }, [updateNodeInTree, selectedFile]);

  return (
    <div className={styles.fileTreeContainer}>
      <div className={styles.fileTreeContent}>
        <FileTreeNode 
          node={fileStructure}
          expandedFolders={expandedFolders}
          selectedFile={selectedFile}
          onToggleFolder={toggleFolder}
          onSelectFile={selectFile}
          onAddFile={addFile}
          onAddFolder={addFolder}
          onEditNode={editNode}
          onDeleteNode={deleteNode}
          editingNode={editingNode}
          setEditingNode={setEditingNode}
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