import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;

  try {
    // Convert "DD-MM-YYYY" to "YYYY-MM-DD"
    const parseDate = (date: string) => {
      const [day, month, year] = date.split("-");
      return `${year}-${month}-${day}`;
    };

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate: new Date(parseDate(startDate)).toISOString(),
        endDate: new Date(parseDate(endDate)).toISOString(),
      },
    });

    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};


export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedProject = await prisma.project.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(deletedProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error deleting project: ${error.message}` });
  }
};