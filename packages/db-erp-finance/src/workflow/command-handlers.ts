/**
 * CQRS-Lite command surface for the approval workflow engine (in-memory until Prisma persistence).
 */
export {
  registerWorkflowDefinition,
  startWorkflow as StartWorkflow,
  approve as Approve,
  reject as Reject,
  delegate as Delegate,
  escalate as Escalate,
  isEntityApproved,
  resetWorkflowEngine,
  getWorkflowOutbox,
} from './engine.js';
