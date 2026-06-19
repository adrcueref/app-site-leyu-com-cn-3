// assets/content-map.js
// Site content partition, tag management, and search filtering

const siteContent = {
  partitions: [
    { id: 1, name: "首页", slug: "home", description: "平台概览与最新动态" },
    { id: 2, name: "体育赛事", slug: "sports", description: "涵盖足球、篮球、网球等主流体育项目" },
    { id: 3, name: "电子竞技", slug: "esports", description: "英雄联盟、DOTA2、CS:GO等电竞赛事" },
    { id: 4, name: "真人娱乐", slug: "live-casino", description: "百家乐、轮盘、骰宝等真人荷官游戏" },
    { id: 5, name: "棋牌游戏", slug: "board-games", description: "斗地主、麻将、德州扑克等经典棋牌" },
    { id: 6, name: "优惠活动", slug: "promotions", description: "限时返利、充值赠礼、赛事竞猜" },
    { id: 7, name: "帮助中心", slug: "help", description: "常见问题、规则说明与客服支持" }
  ],
  tags: [
    { id: "t1", name: "乐鱼体育", partition: "sports" },
    { id: "t2", name: "NBA", partition: "sports" },
    { id: "t3", name: "欧冠", partition: "sports" },
    { id: "t4", name: "英雄联盟S赛", partition: "esports" },
    { id: "t5", name: "百家乐技巧", partition: "live-casino" },
    { id: "t6", name: "德州扑克策略", partition: "board-games" },
    { id: "t7", name: "新用户福利", partition: "promotions" },
    { id: "t8", name: "在线客服", partition: "help" }
  ],
  siteUrl: "https://app-site-leyu.com.cn"
};

function getPartitions() {
  return siteContent.partitions;
}

function getTagsByPartition(slug) {
  return siteContent.tags.filter(tag => tag.partition === slug);
}

function searchContent(query) {
  if (!query || typeof query !== "string") {
    return [];
  }
  const lowerQuery = query.toLowerCase().trim();

  const matchedPartitions = siteContent.partitions.filter(partition => {
    return (
      partition.name.toLowerCase().includes(lowerQuery) ||
      partition.slug.toLowerCase().includes(lowerQuery) ||
      partition.description.toLowerCase().includes(lowerQuery)
    );
  });

  const matchedTags = siteContent.tags.filter(tag => {
    return (
      tag.name.toLowerCase().includes(lowerQuery) ||
      tag.partition.toLowerCase().includes(lowerQuery)
    );
  });

  return {
    partitions: matchedPartitions,
    tags: matchedTags
  };
}

function filterByTag(tagName) {
  if (!tagName || typeof tagName !== "string") {
    return null;
  }
  const foundTag = siteContent.tags.find(tag => tag.name === tagName.trim());
  if (!foundTag) {
    return null;
  }
  const partition = siteContent.partitions.find(p => p.slug === foundTag.partition);
  return {
    tag: foundTag,
    partition: partition || null
  };
}

function listAllTags() {
  return siteContent.tags.map(tag => tag.name);
}

function listAllPartitionNames() {
  return siteContent.partitions.map(p => p.name);
}

function getSiteInfo() {
  return {
    url: siteContent.siteUrl,
    partitionCount: siteContent.partitions.length,
    tagCount: siteContent.tags.length
  };
}

function displayPartitionTree() {
  const tree = siteContent.partitions.map(partition => {
    const tags = getTagsByPartition(partition.slug);
    return {
      partition: partition.name,
      slug: partition.slug,
      tags: tags.map(t => t.name)
    };
  });
  return tree;
}

// Example usage (commented out to avoid side effects):
// console.log(searchContent("乐鱼体育"));
// console.log(filterByTag("乐鱼体育"));
// console.log(displayPartitionTree());