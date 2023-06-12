const router = require("express").Router();
const { findById } = require("../models/Post");
const User = require("../models/User")
// CRUD
// ユーザー情報の更新(put)
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).send("ユーザー情報が更新されました")
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).send("あなたは自分のaccountの時だけ情報を更新できます")
    }
})
// ユーザー情報の削除
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).send("ユーザー情報が削除されました")
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).send("あなたは自分のaccountの時だけ情報を削除できます")
    }
})


// queryでユーザー情報の取得
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId 
            ? await User.findById(userId)
            : await User.findOne({username: username});

        if (!user) {
            return res.status(404).json({ error: 'ユーザーが見つかりません' });
        }

        const { password, updatedAt, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
});

// user follow
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers: req.body.userId,
                    },
                });
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json("フォローに成功しました");
            } else {
                return res.status(403).json("あなたはすでにこのユーザーをフォローしています");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("自分自身をフォローできません");
    }
});
//unfollow
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //フォロワーに存在したらフォローを外せる
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId,
                    },
                });
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json("フォロー解除しました");
            } else {
                return res.status(403).json("このユーザーはフォロー解除できません");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("自分自身はフォロー解除できません");
    }
});

// router.get("/" ,(req, res) =>{
//     res.send("user router")
// })


module.exports = router;