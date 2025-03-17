import { basekit, Component, NextStep, ParamType, StructureType, t } from '@lark-opdev/block-basekit-server-api';

basekit.setI18n({
  // 指定默认的国际化资源
  defaultLocale: 'zh-CN',
  messages: {
    // 指定中文资源
    'zh-CN': {
      "source_field": "源附件字段",
      "source_field_placeholder": "请选择源附件引用列",
      "target_field": "目标附件字段",
      "target_field_placeholder": "请选择目标附件引用列",
      "match_text": "匹配文本",
      "match_text_placeholder": "请输入需要匹配的文本",
      "move_type": "移动类型",
      "move_type_move": "移动",
      "move_type_copy": "复制",
      "result": "处理结果",
      "match_number": "匹配数量",
      "match_name_list": "匹配名称列表"
    },
    // 指定英文资源
    'en-US': {
      "source_field": "Source Attachment Field",
      "source_field_placeholder": "Please select the source attachment reference column",
      "target_field": "Target Attachment Field",
      "target_field_placeholder": "Please select the target attachment reference column",
      "match_text": "Match Text",
      "match_text_placeholder": "Please enter the text to match",
      "move_type": "Move Type",
      "move_type_move": "Move",
      "move_type_copy": "Copy",
      "result": "Process Result",
      "match_number": "Match Number",
      "match_name_list": "Match Name List"
    },
  },
});

basekit.addAction({
  // 自动化表单的UI
  formItems: [
    {
      itemId: 'sourceAttachments',
      label: t('source_field'),
      required: true,
      component: Component.Attachment,
      componentProps: {
        placeholder: t('source_field_placeholder'),
      }
    },
    {
      itemId: 'targetAttachments',
      label: t('target_field'),
      required: true,
      component: Component.Attachment,
      componentProps: {
        placeholder: t('target_field_placeholder'),
      }
    },
    {
      itemId: 'moveType',
      label: t('move_type'),
      required: true,
      component: Component.SingleSelect,
      componentProps: {
        options: [
          {
            label: t('move_type_move'),
            value: 'move',
          },
          {
            label: t('move_type_copy'),
            value: 'copy',
          },
        ]
      },
    },
    {
      itemId: 'matchText',
      label: t('match_text'),
      required: true,
      component: Component.Input,
      componentProps: {
        placeholder: t('match_text_placeholder'),
      },
    }
  ],
  // 定义运行逻辑
  execute: async function (args, context) {
    // 从运行时入参 args 中读取参数变量
    const {
      sourceAttachments = [],
      targetAttachments = [],
      moveType = "",
      matchText = "",
    } = args;
    const onlyMove = moveType === 'move';

    // 中间变量
    let remainingAttachments = [];
    let copiedAttachments = [];
    let updatedSourceAttachments = [...sourceAttachments];
    let updatedTargetAttachments = [...targetAttachments];

    // 筛选出匹配条件的附件
    const matchedAttachments = sourceAttachments.filter(attachment =>
      attachment.name.includes(matchText)
    );

    if (matchedAttachments.length > 0) {
      // 复制匹配的附件
      copiedAttachments = [...matchedAttachments];
      // 根据移动类型处理附件
      if (onlyMove) {
        // 移动模式：从源中移除匹配的附件，添加到目标
        remainingAttachments = sourceAttachments.filter(attachment =>
          !attachment.name.includes(matchText)
        );
        // 更新源附件列表
        updatedSourceAttachments = remainingAttachments;
      }
      // 更新目标附件列表
      updatedTargetAttachments = [...targetAttachments, ...copiedAttachments];
    }

    // 返回处理结果
    return {
      success: true,
      matchNum: matchedAttachments.length,
      matchNameList: matchedAttachments.map(attachment => attachment.name),
      sourceAttachments: updatedSourceAttachments,
      targetAttachments: updatedTargetAttachments,
    };
  },
  // 定义节点出参
  resultType: {
    // 声明返回为对象
    type: ParamType.Object,
    properties: {
      // 声明 success 属性
      success: {
        // 声明 success 字段类型为 Boolean
        type: ParamType.Boolean,
        // 声明在节点 UI 上展示的文案为「转换结果」
        label: t('result'),
      },
      // 声明 matchNum 属性
      matchNum: {
        // 声明 matchNum 字段类型为 Number
        type: ParamType.Number,
        // 声明在节点 UI 上展示的文案为「匹配数量」
        label: t('match_number'),
      },
      // 声明 matchNameList 属性
      matchNameList: {
        // 声明 matchNameList 字段类型为 Array
        type: ParamType.Array,
        // 声明在节点 UI 上展示的文案为「匹配名称列表」
        label: t('match_name_list'),
      },
      // 声明 sourceAttachments 属性
      sourceAttachments: {
        // 声明 sourceAttachments 字段类型为 Array
        type: ParamType.Array,
        // 声明 sourceAttachments 字段类型为附件
        structureType: StructureType.Attachment,
        // 声明在节点 UI 上展示的文案为「源附件字段」
        label: t('source_field'),
      },
      // 声明 targetAttachments 属性
      targetAttachments: {
        // 声明 targetAttachments 字段类型为 Array
        type: ParamType.Array,
        // 声明 targetAttachments 字段类型为附件
        structureType: StructureType.Attachment,
        // 声明在节点 UI 上展示的文案为「目标附件字段」
        label: t('target_field'),
      },
    }
  },
  nextSteps: [
    NextStep.SetRecord
  ]
});

export default basekit;
