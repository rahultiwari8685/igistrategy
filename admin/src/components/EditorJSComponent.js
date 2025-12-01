import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";
import Paragraph from "@editorjs/paragraph";

const EditorJSComponent = ({ data, onChange }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = new EditorJS({
                holder: "editorjs",
                autofocus: true,
                data: data,
                tools: {
                    paragraph: Paragraph,
                    header: {
                        class: Header,
                        inlineToolbar: true,
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                    quote: Quote,
                    embed: Embed, // YouTube, Facebook etc
                    linkTool: LinkTool,
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                uploadByFile(file) {
                                    // TODO: SEND file to API | currently returns preview only
                                    return new Promise((resolve) => {
                                        const url = URL.createObjectURL(file);
                                        resolve({
                                            success: 1,
                                            file: { url },
                                        });
                                    });
                                },
                            },
                        },
                    },
                },

                onChange: async () => {
                    const output = await editorRef.current.save();
                    onChange(output);
                },
            });
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    return <div id="editorjs" className="border rounded p-2" style={{ minHeight: 250 }} />;
};

export default EditorJSComponent;
