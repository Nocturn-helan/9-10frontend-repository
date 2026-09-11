// script.js —— 收支统计
const records = [
  { name: '工资',     type: 'income',  amount: 8500 },
  { name: '房租',     type: 'expense', amount: 2600 },
  { name: '餐饮',     type: 'expense', amount: 1500 },
  { name: '交通',     type: 'expense', amount: 320 },
  { name: '购物',     type: 'expense', amount: 999 },
  { name: '理财收益', type: 'income',  amount: -200 },    // 故意混入非法值：负金额
  { name: '转账',     type: 'expense', amount: 0 },       // 金额为 0
  { name: '分红',     type: 'income',  amount: 200000 }   // 单笔超出上限
];

