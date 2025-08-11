import Image from "next/image";
import React from "react";

const SkillBody = () => {
  const SkillDataArray = [
    {
      name: "JavaScript",
      Icon: "icons/skills/javascript.svg",
    },
    {
      name: "TypeScript",
      Icon: "icons/skills/typescript.svg",
    },
    {
      name: "Git",
      Icon: "icons/skills/git.svg",
    },
    {
      name: "Git Hub",
      Icon: "icons/skills/github.svg",
    },
    {
      name: "HTML",
      Icon: "icons/skills/html.svg",
    },
    {
      name: "CSS",
      Icon: "icons/skills/css.svg",
    },
    {
      name: "Tailwind CSS",
      Icon: "icons/skills/tailwind.svg",
    },
    {
      name: "NextJS",
      Icon: "icons/skills/nextJs.svg",
    },
    {
      name: "Node.js",
      Icon: "icons/skills/node.svg",
    },
    {
      name: "Express.js",
      Icon: "icons/skills/express.svg",
    },
    {
      name: "MongoDB",
      Icon: "icons/skills/mongodb.svg",
    },
    {
      name: "PostgreSQL",
      Icon: "icons/skills/postgresql.svg",
    },
    {
      name: "Prisma",
      Icon: "icons/skills/prisma.svg",
    },
    {
      name: "Docker",
      Icon: "icons/skills/docker.svg",
    },

    {
      name: "Postman",
      Icon: "icons/skills/postman.svg",
    },
    {
      name: "VS Code",
      Icon: "icons/skills/vscode.svg",
    },
    {
      name: "Redux",
      Icon: "icons/skills/redux.svg",
    },
    {
      name: "REST API",
      Icon: "icons/skills/restapi.svg",
    },
    {
      name: "GraphQL",
      Icon: "icons/skills/react.svg",
    },
    {
      name: "Jest",
      Icon: "icons/skills/react.svg",
    },
    {
      name: "Webpack",
      Icon: "icons/skills/react.svg",
    },
    {
      name: "npm",
      Icon: "icons/skills/react.svg",
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        {SkillDataArray.map((item, idx) => (
          <div
            key={idx}
            className="m-2 flex justify-center items-center gap-2 border border-white/20 py-1 px-3 rounded-xl bg-white/5 backdrop-blur-sm"
          >
            <Image
              key={item.name}
              src={item.Icon}
              alt={item.name}
              width={25}
              height={25}
              className="p-0.5 rounded-md"
            />
            <p className="text-white text-center text-xl font-medium">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillBody;
