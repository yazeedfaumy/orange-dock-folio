export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          created_at: string
          credential_id: string | null
          credential_url: string | null
          display_order: number | null
          expiry_date: string | null
          id: string
          image_url: string | null
          issue_date: string | null
          issuing_organization: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          display_order?: number | null
          expiry_date?: string | null
          id?: string
          image_url?: string | null
          issue_date?: string | null
          issuing_organization: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          display_order?: number | null
          expiry_date?: string | null
          id?: string
          image_url?: string | null
          issue_date?: string | null
          issuing_organization?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          created_at: string
          cv_url: string | null
          email: string
          github_url: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          phone: string | null
          twitter_url: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          cv_url?: string | null
          email: string
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          cv_url?: string | null
          email?: string
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          twitter_url?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      education: {
        Row: {
          achievements: string[] | null
          created_at: string
          degree: string
          description: string | null
          display_order: number | null
          end_date: string | null
          field_of_study: string | null
          grade: string | null
          id: string
          institution_logo: string | null
          institution_name: string
          is_current: boolean | null
          location: string | null
          start_date: string
          updated_at: string
        }
        Insert: {
          achievements?: string[] | null
          created_at?: string
          degree: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          field_of_study?: string | null
          grade?: string | null
          id?: string
          institution_logo?: string | null
          institution_name: string
          is_current?: boolean | null
          location?: string | null
          start_date: string
          updated_at?: string
        }
        Update: {
          achievements?: string[] | null
          created_at?: string
          degree?: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          field_of_study?: string | null
          grade?: string | null
          id?: string
          institution_logo?: string | null
          institution_name?: string
          is_current?: boolean | null
          location?: string | null
          start_date?: string
          updated_at?: string
        }
        Relationships: []
      }
      featured_projects: {
        Row: {
          created_at: string
          demo_url: string | null
          description: string
          display_order: number | null
          end_date: string | null
          featured: boolean | null
          github_url: string | null
          id: string
          image_url: string | null
          short_description: string | null
          start_date: string | null
          status: string | null
          technologies: string[]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          demo_url?: string | null
          description: string
          display_order?: number | null
          end_date?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          short_description?: string | null
          start_date?: string | null
          status?: string | null
          technologies?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          demo_url?: string | null
          description?: string
          display_order?: number | null
          end_date?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          short_description?: string | null
          start_date?: string | null
          status?: string | null
          technologies?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      professional_experience: {
        Row: {
          achievements: string[] | null
          company_logo: string | null
          company_name: string
          created_at: string
          description: string | null
          display_order: number | null
          end_date: string | null
          id: string
          is_current: boolean | null
          job_title: string
          location: string | null
          start_date: string
          technologies_used: string[] | null
          updated_at: string
        }
        Insert: {
          achievements?: string[] | null
          company_logo?: string | null
          company_name: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          job_title: string
          location?: string | null
          start_date: string
          technologies_used?: string[] | null
          updated_at?: string
        }
        Update: {
          achievements?: string[] | null
          company_logo?: string | null
          company_name?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          job_title?: string
          location?: string | null
          start_date?: string
          technologies_used?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      smtp_config: {
        Row: {
          created_at: string
          enabled: boolean | null
          from_email: string
          from_name: string
          id: string
          smtp_host: string
          smtp_password: string
          smtp_port: number
          smtp_username: string
          to_email: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean | null
          from_email: string
          from_name?: string
          id?: string
          smtp_host: string
          smtp_password: string
          smtp_port?: number
          smtp_username: string
          to_email: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          enabled?: boolean | null
          from_email?: string
          from_name?: string
          id?: string
          smtp_host?: string
          smtp_password?: string
          smtp_port?: number
          smtp_username?: string
          to_email?: string
          updated_at?: string
        }
        Relationships: []
      }
      technical_skills: {
        Row: {
          category_id: string | null
          created_at: string
          display_order: number | null
          icon: string | null
          id: string
          name: string
          proficiency_level: number | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          name: string
          proficiency_level?: number | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          display_order?: number | null
          icon?: string | null
          id?: string
          name?: string
          proficiency_level?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "technical_skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      tools_technologies: {
        Row: {
          category: string
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          name: string
          proficiency_level: number | null
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name: string
          proficiency_level?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          name?: string
          proficiency_level?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
