import { Node } from "@tiptap/core";

export const Video = Node.create({
  name: "video",

  group: "block",

  draggable: true,

  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["video", { ...HTMLAttributes, controls: true }];
  },
});
