"use client";
import React, { useRef, useEffect } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import { markdown } from '@codemirror/lang-markdown';
import { githubDark } from '@fsegurai/codemirror-theme-github-dark';
import { abcdef } from '@fsegurai/codemirror-theme-abcdef';
import { solarizedDark } from '@fsegurai/codemirror-theme-solarized-dark';
import { solarizedLight } from '@fsegurai/codemirror-theme-solarized-light';
import { autocompletion, completionKeymap, closeBrackets } from '@codemirror/autocomplete';
import { keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import styles from "./editor.module.css";

const CodeEditor = ({ language = 'javascript', value = '', onChange }) => {
  const editorRef = useRef(null);
  const viewRef = useRef(null);

  const getLanguageExtension = (lang) => {
    switch (lang.toLowerCase()) {
      case 'javascript':
      case 'js':
        return javascript();
      case 'typescript':
      case 'ts':
        return javascript({ typescript: true });
      case 'python':
      case 'py':
        return python();
      case 'java':
        return java();
      case 'cpp':
      case 'c++':
        return cpp();
      case 'html':
        return html();
      case 'css':
        return css();
      case 'json':
        return json();
      case 'xml':
        return xml();
      case 'php':
        return php();
      case 'rust':
      case 'rs':
        return rust();
      case 'sql':
        return sql();
      case 'markdown':
      case 'md':
        return markdown();
      default:
        return javascript();
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      const view = new EditorView({
        doc: value,
        extensions: [
          basicSetup,
          getLanguageExtension(language),
          githubDark,
          autocompletion({
            activateOnTyping: true,
            selectOnOpen: true,
            closeOnBlur: true,
            maxRenderedOptions: 20
          }),
          closeBrackets(),
          keymap.of([
            ...completionKeymap,
            indentWithTab
          ]),
          EditorView.updateListener.of((update) => {
            if (update.changes && onChange) {
              onChange(update.state.doc.toString());
            }
          }),
          EditorView.theme({
            '&': {
              height: '100dvh',
              fontSize: '12px'
            },
            '.cm-editor': {
              height: '100%'
            },
            '.cm-scroller': {
              overflow: 'auto'
            }
          })
        ],
        parent: editorRef.current
      });

      viewRef.current = view;

      return () => {
        view.destroy();
      };
    }
  }, [language]);

  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== value) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value
        }
      });
    }
  }, [value]);

  return <div className={styles.editor} ref={editorRef}/>;
};

export default CodeEditor;