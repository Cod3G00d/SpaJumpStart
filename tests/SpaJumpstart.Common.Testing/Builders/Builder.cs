﻿using System;

namespace SpaJumpstart.Common.Testing.Builders
{
    /// <summary>
    /// A builder class - scaffolding to build types for use in testing...
    /// </summary>
    public abstract class Builder<TBuilderType, TBuildType>
    {
        /// <summary>
        /// Returns an instance of type (TBuildType) generated by the Builder Type
        /// </summary>
        public abstract TBuildType AnInstance();

        /// <summary>
        /// Allows fluent type syntax on the Builder, returning an instance of the input BuilderType
        /// </summary>
        public static TBuilderType Build
        {
            get { return Activator.CreateInstance<TBuilderType>(); }
        }
    }
}