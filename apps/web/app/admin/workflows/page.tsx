import { WorkflowDesigner } from '../../../components/workflow-designer';

export default function WorkflowDesignerPage() {
  return (
    <main className="p-6 space-y-4" dir="rtl">
      <h1 className="text-2xl font-bold">طراح گردش کار</h1>
      <WorkflowDesigner />
    </main>
  );
}
