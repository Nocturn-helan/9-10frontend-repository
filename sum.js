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

// 清洗：只保留 0 至 100000 之间的合法金额
const cleanRecords = (list) => list.filter(r => r.amount > 0 && r.amount <= 100000);

// 平均单笔
const average = (list) => {
  if (list.length === 0) return 0;   // 空数组保护，除零会产生 NaN
  const total = list.reduce((sum, r) => sum + r.amount, 0);
  return (total / list.length).toFixed(2);
};

// 最大单笔
const highest = (list) => list.reduce((max, r) => r.amount > max.amount ? r : max, list[0]);

// 超支名单（单笔支出超过 1000 元）
const overspent = (list) => list.filter(r => r.type === 'expense' && r.amount > 1000).map(r => r.name);

console.log('清洗后：', cleanRecords(records));
console.log('平均单笔：', average(cleanRecords(records)));
console.log('最大单笔：', highest(cleanRecords(records)));
console.log('超支名单：', overspent(cleanRecords(records)));



// 等级判定（单值进单值出，纯函数）
const toGrade = (amount) => {
  if (amount >= 5000) return 'A';
  if (amount >= 2000) return 'B';
  if (amount >= 1000) return 'C';
  if (amount >= 500)  return 'D';
  return 'F';
};

// 各等级笔数统计
const gradeCount = (list) => {
  const result = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  list.forEach(r => { result[toGrade(r.amount)]++; });
  return result;
};

// 格式化报告
const report = (list) => {
  const valid = cleanRecords(list);
  if (valid.length === 0) {
    return '没有有效收支记录';
  }
  const dist = gradeCount(valid);
  const top = highest(valid);
  return `有效记录${valid.length}笔，平均单笔${average(valid)}元，最大单笔${top.amount}元（${top.name}）；
等级分布：A${dist.A}笔 B${dist.B}笔 C${dist.C}笔 D${dist.D}笔 F${dist.F}笔；
超支名单：${overspent(valid).join('、') || '无'}`;
};

try {
  console.log(report(records));
} catch (err) {
  console.error('报告生成失败：', err.message);
}