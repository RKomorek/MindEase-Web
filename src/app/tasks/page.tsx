"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import SafeAreaWrapper from "@/components/ui/safe-area-wrapper";
import { ThemedView } from "@/components/ui/themed-view";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Pomodoro from "@/components/ui/pomodoro";

import { useTasksStore } from "@/shared/stores/tasks-store";
import { useThemeColor } from "@/shared/hooks/use-theme-color";

import {
  useCognitiveScreenTitleStyle,
  useCognitiveSpacing,
} from "@/components/ui/cognitive-styles";

import type {
  Task,
  TaskStage,
} from "@/features/tasks/domain/entities/task.entity";

export default function TasksPage() {
  const router = useRouter();

  const foreground = useThemeColor({}, "foreground");
  const titleStyle = useCognitiveScreenTitleStyle();
  const { pad, gap } = useCognitiveSpacing();

  const {
    tasks,
    createTask,
    deleteTask,
    moveTask,
    toggleChecklistItem,
    clearDone,
  } = useTasksStore();

  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState<"study" | "work" | "none">("study");

  const todo = tasks.filter((t) => t.stage === "todo");
  const doing = tasks.filter((t) => t.stage === "doing");
  const done = tasks.filter((t) => t.stage === "done");

  function handleAddTask() {
    const trimmed = title.trim();
    if (!trimmed) return;

    createTask(trimmed, template);
    setTitle("");
  }

  return (
    <SafeAreaWrapper>
      <ThemedView
        style={{
          flex: 1,
          minHeight: "100vh",
          padding: pad,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* HEADER */}

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Button
                title="←"
                variant="ghost"
                style={{ height: "32px" }}
                onClick={() => router.push("/")}
              />

              <h1 style={{ ...titleStyle, color: foreground }}>Tarefas</h1>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Estudar matemática"
                className="border rounded-lg px-3 py-2 w-64 text-sm bg-transparent"
                style={{ color: foreground }}
              />

              <Button
                title="Estudo"
                variant={template === "study" ? "primary" : "secondary"}
                style={{ height: "32px" }}
                onClick={() => setTemplate("study")}
              />

              <Button
                title="Trabalho"
                variant={template === "work" ? "primary" : "secondary"}
                style={{ height: "32px" }}
                onClick={() => setTemplate("work")}
              />

              <Button
                title="Lazer"
                variant={template === "none" ? "primary" : "secondary"}
                style={{ height: "32px" }}
                onClick={() => setTemplate("none")}
              />

              <Button
                title="Adicionar"
                style={{ height: "32px" }}
                onClick={handleAddTask}
              />
            </div>
          </div>

          {/* POMODORO */}

          <Pomodoro />

          {/* KANBAN */}

          <div className="flex gap-6">
            <TaskColumn
              title="A fazer"
              tasks={todo}
              deleteTask={deleteTask}
              moveTask={moveTask}
              toggleChecklist={toggleChecklistItem}
            />

            <TaskColumn
              title="Fazendo"
              tasks={doing}
              deleteTask={deleteTask}
              moveTask={moveTask}
              toggleChecklist={toggleChecklistItem}
            />

            <TaskColumn
              title="Concluída"
              tasks={done}
              deleteTask={deleteTask}
              moveTask={moveTask}
              toggleChecklist={toggleChecklistItem}
            />
          </div>

          {done.length > 0 && (
            <div className="flex justify-center">
              <Button
                title="Limpar concluídas"
                variant="secondary"
                style={{ height: "32px" }}
                onClick={clearDone}
              />
            </div>
          )}
        </div>
      </ThemedView>
    </SafeAreaWrapper>
  );
}

function TaskColumn({
  title,
  tasks,
  deleteTask,
  moveTask,
  toggleChecklist,
}: {
  title: string;
  tasks: Task[];
  deleteTask: (id: string) => void;
  moveTask: (id: string, stage: TaskStage) => void;
  toggleChecklist: (taskId: string, itemId: string) => void;
}) {
  const foreground = useThemeColor({}, "foreground");
  return (
    <Card
      style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}
    >
      <div className="flex justify-between font-semibold">
        <span style={{ color: foreground }}>{title}</span>
        <span className="opacity-50 text-sm">{tasks.length}</span>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.length === 0 && (
          <p style={{ color: foreground, opacity: 0.6 }} className="text-sm">
            Nenhuma tarefa
          </p>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={() => deleteTask(task.id)}
            moveTask={moveTask}
            toggleChecklist={toggleChecklist}
          />
        ))}
      </div>
    </Card>
  );
}

function TaskCard({
  task,
  deleteTask,
  moveTask,
  toggleChecklist,
}: {
  task: Task;
  deleteTask: () => void;
  moveTask: (id: string, stage: TaskStage) => void;
  toggleChecklist: (taskId: string, itemId: string) => void;
}) {
  const foreground = useThemeColor({}, "foreground");
  const checklistDone = task.checklist.filter((i) => i.done).length;

  return (
    <Card
      style={{ display: "flex", flexDirection: "column", gap: 12, padding: 12 }}
    >
      <div className="font-semibold" style={{ color: foreground }}>
        {task.title}
      </div>

      {task.checklist.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-xs" style={{ color: foreground, opacity: 0.6 }}>
            Checklist {checklistDone}/{task.checklist.length}
          </div>

          {task.checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(task.id, item.id)}
              className="text-sm cursor-pointer select-none"
              style={{ color: foreground }}
            >
              {item.done ? "✓" : "○"} {item.label}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {task.stage !== "todo" && (
          <Button
            title="A fazer"
            variant="secondary"
            style={{ height: "32px" }}
            onClick={() => moveTask(task.id, "todo")}
          />
        )}

        {task.stage !== "doing" && (
          <Button
            title="Fazendo"
            variant="secondary"
            style={{ height: "32px" }}
            onClick={() => moveTask(task.id, "doing")}
          />
        )}

        {task.stage !== "done" && (
          <Button
            title="Concluída"
            variant="secondary"
            style={{ height: "32px" }}
            onClick={() => moveTask(task.id, "done")}
          />
        )}

        <Button
          title="Excluir"
          variant="ghost"
          style={{ height: "32px" }}
          onClick={deleteTask}
        />
      </div>
    </Card>
  );
}
