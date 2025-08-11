import SkillBody from "./skillBody";
import Tittle from "./tittle";

const SkillSection = () => {
  return (
    <div>
      <Tittle
        tittle="SKILLS"
        showDesc={true}
        desc="I constantly try to improve my skills"
      />
      <SkillBody />
    </div>
  );
};

export default SkillSection;
