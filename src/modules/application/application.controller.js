import activityModel from "../../../DB/model/activity.model.js";
import applicationModel from "../../../DB/model/application.model.js";
import UserModel from "../../../DB/model/user.model.js";
export const create = async (req, res) => {
  const { activityId } = req.body;
  const activity = await activityModel.findOne({
    _id: activityId,
    requestStatus: "accepted",
  });
  if (!activity) {
    return res.status(404).json({ message: "Activity not found" });
  }
  const existingApplication = await applicationModel.findOne({
    userId: req.user._id,
    activityId,
  });
  if (existingApplication) {
    return res
      .status(400)
      .json({ message: "You have already applied for this activity" });
  }
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const application = await applicationModel.create({
    userId: req.user._id,
    activityId,
    address: user.address,
    PhoneNumber: user.phone,
    UpdatedBy: req.user._id,
  });
  return res.status(200).json({ message: "success", application });
};
export const getall = async (req, res) => {
  const application = await applicationModel.find().populate([
    {
      path: "userId",
      select: "userName",
    },
    {
      path: "activityId",
      match: { volunteer: req.user._id },
    },
  ]);
  return res.status(200).json({ message: "success", application });
};
export const change_status = async (req, res) => {
  const { applicationId } = req.params;
  const { status, notes, rejectedReason } = req.body;

  try {
    const application = await applicationModel
      .findById(applicationId)
      .populate({ path: "activityId", match: { volunteer: req.user._id } });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (!application.activityId) {
      return res.status(403).json({
        message:
          "You are not authorized to change the status of this application.",
      });
    }

    if (application.activityId.requestStatus !== "accepted") {
      return res.status(403).json({
        message:
          "Activity status must be 'accepted' to change application status.",
      });
    }

    const oldStatus = application.status;

    // Decrease available spots if newly accepted
    if (status === "accepted") {
      if (application.activityId.numberOfPeople === 0) {
        return res.status(400).json({
          message: "No more people available for this activity.",
        });
      }
      application.activityId.numberOfPeople -= 1;
    }

    // If changing from accepted to another state, restore a spot
    if (
      oldStatus === "accepted" &&
      (status === "pending" || status === "rejected")
    ) {
      application.activityId.numberOfPeople += 1;
    }

    // ✅ SET THE STATUS!
    application.status = status;

    // ✅ SET NOTES (if provided)
    if (notes) {
      application.notes = notes;
    }

    // ✅ SET REJECTED REASON (if rejected)
    if (status === "rejected" && rejectedReason) {
      application.rejectedReason = rejectedReason;
    }

    // Save both application and activity
    await application.activityId.save();
    await application.save();

    return res.status(200).json({ message: "success", application });
  } catch (error) {
    console.error("Change status error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/*export const getAlluserApplication = async(req,res)=>{

    const application = await applicationModel.find().populate([
        {
            path: 'userId',
            select: 'userName'
        },
        {
            path: 'activityId',
            match: {volunteer:req.user._id}
        }
    ]);
    return res.status(200).json({message:"success",application});
}*/

/*export const getuserApplication = async(req,res)=>{

    const application = await applicationModel.find({userId:req.user._id}).populate([
        {
            path: 'activityId',
            select:'organizationName name requestStatus startDate endDate city address'
        }
    ]);
    return res.status(200).json({message:"success",application});
}*/
export const getAllUserApplications = async (req, res) => {
  const { activityId } = req.params;
  const activity = await activityModel.findOne({
    _id: activityId,
    volunteer: req.user._id,
  });

  if (!activity) {
    return res
      .status(403)
      .json({ message: "Access denied or activity not found" });
  }
  const applications = await applicationModel
    .find({
      activityId,
    })
    .populate([
      {
        path: "userId",
        select: "firstName lastName email phone address city image",
      },
      { path: "activityId", select: "name city startDate endDate description" },
    ]);

  return res.status(200).json({ message: "success", applications });
};

export const getuserApplication = async (req, res) => {
  const application = await applicationModel
    .find({ userId: req.user._id })
    .populate({
      path: "userId",
      model: "User",
      select: "firstName lastName email phone address city image",
    })
    .populate({
      path: "activityId",
      select:
        "organizationName name requestStatus startDate endDate description city address volunteer image",
      populate: {
        path: "volunteer",
        model: "User",
        select: "firstName lastName email phone address city image",
      },
    });

  return res.status(200).json({ message: "success", application });
};
