import { Schema, model, models } from "mongoose";
import { ISkill, ISkillsGroup } from "@/types/Skills";

const skillSchema = new Schema<ISkill>({
  name: String,
  _id: Schema.Types.ObjectId,
  group: { type: Schema.Types.ObjectId, ref: "SkillsGroup" },
  image: String,
  color: String,
  description: String,
});

const skillsGroupSchema = new Schema<ISkillsGroup>({
  name: String,
  _id: Schema.Types.ObjectId,
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
});

const SkillsGroup =
  models.SkillsGroup || model<ISkillsGroup>("SkillsGroup", skillsGroupSchema);
const Skill = models.Skill || model<ISkill>("Skill", skillSchema);

export { Skill, SkillsGroup };
