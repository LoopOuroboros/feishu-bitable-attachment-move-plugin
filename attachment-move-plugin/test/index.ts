import { testAction, createActionContext } from '@lark-opdev/block-basekit-server-api';

async function testMove() {
  const actionContext = await createActionContext({
    tenantAccessToken: '',
  });

  console.log('testMove');

  testAction({
    sourceAttachments: [
      {
        attachmentToken: "",
        extra: "",
        id: "",
        mimeType: "image/png",
        name: "image.png",
        size: 1024,
        timeStamp: 1678768000000,
      }
    ],
    targetAttachments: [],
    moveType: "move",
    matchText: "image",
  },
    actionContext);
}

async function testCopy() {
  const actionContext = await createActionContext({
    tenantAccessToken: '',
  });

  console.log('testCopy');

  testAction({
    sourceAttachments: [
      {
        attachmentToken: "",
        extra: "",
        id: "",
        mimeType: "image/png",
        name: "image.png",
        size: 1024,
        timeStamp: 1678768000000,
      }
    ],
    targetAttachments: [],
    moveType: "copy",
    matchText: "image",
  },
    actionContext);
}

testMove();
testCopy();