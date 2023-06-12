const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// 投稿作成
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (err) {
        return res.status(500).json(err);
    }
});

// 投稿を編集
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({
                $set: req.body,
            });
            return res.status(200).json("投稿編集に成功しました")
        } else {
            return res.status(403).json("あなたはほかの人の投稿を編集できません")
        }
    } catch (err) {
        return res.status(403).json(err)
    }
});
// 投稿を削除
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("投稿削除に成功しました")
        } else {
            return res.status(403).json("あなたはほかの人の投稿を削除できません")
        }
    } catch (err) {
        return res.status(403).json(err)
    }
});
// 投稿を取得
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post)

    } catch (err) {
        return res.status(403).json(err)
    }
});

// 特定の投稿にいいねを押す
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        // いいねしていなかったらいいねを押せる
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({
                $push: {
                    likes: req.body.userId,
                }
            });
            return res.status(200).json("投稿にいいねを押しました！");
            //投稿にすでにいいねを押されていたら
        } else {
            await post.updateOne({
                $pull: {
                    likes: req.body.userId,
                },
            });
            return res.status(200).json("投稿のいいねを外しました")
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// タイムラインの投稿を取得
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id })
        // 友達の投稿内容をすべて取得
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        return res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        return res.status(500).json(err);
    }
});


// 自分だけのタイムラインを表示
router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      if (!user) {
        return res.status(404).json({ error: 'ユーザーが見つかりません' });
      }
      
      const posts = await Post.find({ userId: user._id });
      return res.status(200).json(posts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
  });


module.exports = router;