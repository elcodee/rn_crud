const { Memo } = require("../../models");

exports.GetAllMemo = async (req, res) => {
  try {
    const memos = await Memo.findAll({});

    if (!memos.length) {
      res.status(404).send({
        status: "failed",
        msg: `There's No Memo here`,
      });
    }

    res.status(200).send({
      status: "success",
      msg: `All Memo`,
      memo: memos,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      msg: `Something Went Wrong`,
    });
  }
};

exports.GetMemoById = async (req, res) => {
  try {
    const memo = await Memo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!memo) {
      res.status(404).send({
        status: "failed",
        msg: `Couldn't Find Memo`,
      });
    } else {
      res.status(200).send({
        status: "success",
        msg: `Memo ID: ${memo.id}`,
        memo: memo,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "failed",
      msg: `Something Went Wrong`,
    });
  }
};

exports.CreateMemo = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(401).send({
        status: "failed",
        msg: `Something Went Wrong`,
      });
    }

    await Memo.create({
      title,
      content,
    });

    res.status(200).send({
      status: "success",
      msg: `Memo Added ${title}`,
      memo: { title, content },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      msg: `Something Went Wrong`,
    });
  }
};

exports.UpdateMemo = async (req, res) => {
  try {
    let newMemo = req.body;

    if (!newMemo.title || !newMemo.content) {
      res.status(404).send({
        status: "failed",
        msg: `Something Went Wrong`,
      });
    } else {
      await Memo.update(newMemo, {
        where: {
          id: req.params.id,
        },
      });

      res.status(200).send({
        status: "success",
        msg: `Memo Updated ${newMemo.title}`,
        memo: newMemo,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "failed",
      msg: `Something Went Wrong`,
    });
  }
};

exports.DeleteMemo = async (req, res) => {
  try {
    const memo = await Memo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!memo) {
      res.status(404).send({
        status: "failed",
        msg: `Couldn't Find Memo`,
      });
    } else {
      await Memo.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).send({
        status: "success",
        msg: `Memo ID: ${req.params.id} Has been Deleted`,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "failed",
      msg: `Something Went Wrong`,
    });
  }
};
