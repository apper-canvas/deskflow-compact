// Task Service using Apper Backend Integration
export const taskService = {
  // Initialize ApperClient
  getApperClient() {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  },

  async getAll() {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'task_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Transform database fields to UI field names for backward compatibility
      const tasks = (response.data || []).map(task => ({
        Id: task.Id,
        title: task.title_c || '',
        priority: task.priority_c || 'medium',
        category: task.category_c || 'projects',
        dueDate: task.dueDate_c || null,
        completed: task.completed_c || false,
        createdAt: task.createdAt_c || task.CreatedOn,
        completedAt: task.completedAt_c || null,
        // Keep original database fields for future use
        name: task.Name || '',
        tags: task.Tags || '',
        owner: task.Owner || null
      }));

      return tasks;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tasks:", error.message);
        throw error;
      }
    }
  },

  async getById(id) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'task_c';
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } },
          { field: { Name: "title_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "dueDate_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "createdAt_c" } },
          { field: { Name: "completedAt_c" } }
        ]
      };

      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Task not found");
      }

      // Transform database fields to UI field names
      const task = {
        Id: response.data.Id,
        title: response.data.title_c || '',
        priority: response.data.priority_c || 'medium',
        category: response.data.category_c || 'projects',
        dueDate: response.data.dueDate_c || null,
        completed: response.data.completed_c || false,
        createdAt: response.data.createdAt_c || response.data.CreatedOn,
        completedAt: response.data.completedAt_c || null,
        name: response.data.Name || '',
        tags: response.data.Tags || '',
        owner: response.data.Owner || null
      };

      return task;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message);
        throw error;
      }
    }
  },

  async create(taskData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'task_c';
      
      // Map UI fields to database fields and include only Updateable fields
      const params = {
        records: [{
          Name: taskData.title || '',
          title_c: taskData.title || '',
          priority_c: taskData.priority || 'medium',
          category_c: taskData.category || 'projects',
          dueDate_c: taskData.dueDate || null,
          completed_c: false,
          createdAt_c: new Date().toISOString(),
          completedAt_c: null,
          Tags: taskData.tags || ''
        }]
      };

      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} task records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const createdTask = successfulRecords[0].data;
          // Transform back to UI format
          return {
            Id: createdTask.Id,
            title: createdTask.title_c || '',
            priority: createdTask.priority_c || 'medium',
            category: createdTask.category_c || 'projects',
            dueDate: createdTask.dueDate_c || null,
            completed: createdTask.completed_c || false,
            createdAt: createdTask.createdAt_c || createdTask.CreatedOn,
            completedAt: createdTask.completedAt_c || null
          };
        }
      }
      
      throw new Error("No records were created");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating task:", error.message);
        throw error;
      }
    }
  },

  async update(id, updateData) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'task_c';
      
      // Map UI fields to database fields and include only Updateable fields
      const updateFields = {
        Id: parseInt(id)
      };

      // Only include fields that are being updated
      if (updateData.title !== undefined) {
        updateFields.Name = updateData.title;
        updateFields.title_c = updateData.title;
      }
      if (updateData.priority !== undefined) {
        updateFields.priority_c = updateData.priority;
      }
      if (updateData.category !== undefined) {
        updateFields.category_c = updateData.category;
      }
      if (updateData.dueDate !== undefined) {
        updateFields.dueDate_c = updateData.dueDate;
      }
      if (updateData.completed !== undefined) {
        updateFields.completed_c = updateData.completed;
      }
      if (updateData.completedAt !== undefined) {
        updateFields.completedAt_c = updateData.completedAt;
      }
      if (updateData.tags !== undefined) {
        updateFields.Tags = updateData.tags;
      }

      const params = {
        records: [updateFields]
      };

      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} task records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updatedTask = successfulUpdates[0].data;
          // Transform back to UI format
          return {
            Id: updatedTask.Id,
            title: updatedTask.title_c || '',
            priority: updatedTask.priority_c || 'medium',
            category: updatedTask.category_c || 'projects',
            dueDate: updatedTask.dueDate_c || null,
            completed: updatedTask.completed_c || false,
            createdAt: updatedTask.createdAt_c || updatedTask.CreatedOn,
            completedAt: updatedTask.completedAt_c || null
          };
        }
      }
      
      throw new Error("No records were updated");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating task:", error.message);
        throw error;
      }
    }
  },

  async delete(id) {
    try {
      const apperClient = this.getApperClient();
      const tableName = 'task_c';
      
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} task records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting task:", error.message);
        throw error;
      }
    }
}
};